import { createStyles, makeStyles } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { FETCH_NEW_RECOMMENDATIONS } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import { ListContainer, ListSubTitle, ListTitle, RecommendationCardContainer } from 'sections/CardsList/List.style'
import { IRecommendation } from 'utilities/types/recommendation'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            formControl: {
                minWidth: 120,
            },
            selectEmpty: {},
            select: {
                fontFamily: 'Rubik',
                fontSize: '12px',
                fontWeight: 500,
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '1.67',
                letterSpacing: '2px',
            },
            root: {
                marginTop: '30px',
            },
        },
    })
)

interface IHomeNewRecommendationsProps {
    initialRecommendations: IRecommendation[] | any[]
    initialTotalPages: number
    initialPage: number
    initialPageSize: number
}

const HomeNewRecommendations: React.FC<IHomeNewRecommendationsProps> = ({
    initialRecommendations,
    initialTotalPages,
    initialPage,
    initialPageSize,
}) => {
    const classes = useStyles()
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IRecommendation[]>([])
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)
    const [currentPageSize, setCurrentPageSize] = React.useState(3)

    React.useEffect(() => {
        if (initialRecommendations && initialRecommendations.length > 0) {
            setCurrentRecommendations(initialRecommendations)
        } else {
            setCurrentRecommendations([])
        }
    }, [initialRecommendations])

    React.useEffect(() => {
        setCurrentPageCount(initialTotalPages)
    }, [initialTotalPages])

    React.useEffect(() => {
        setCurrentPage(initialPage + 1)
    }, [initialPage])

    React.useEffect(() => {
        setCurrentPageSize(initialPageSize)
    }, [initialPageSize])

    const fetchNewRecommendations = (page: number) => {
        axios
            .get(FETCH_NEW_RECOMMENDATIONS(page))
            .then((res) => {
                setCurrentRecommendations(res.data.content)
                setCurrentPage(res.data.number + 1)
                setCurrentPageSize(res.data.size)
                setCurrentPageCount(res.data.totalPages)
            })
            .catch((err) => console.log(err))
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchNewRecommendations(value - 1)
    }

    return (
        <ListContainer>
            <ListTitle>{S.HOME_PAGE.NewRecommendationsTitle}</ListTitle>
            <ListSubTitle>{S.HOME_PAGE.NewRecommendationsSubTitle}</ListSubTitle>
            {currentRecommendations &&
                currentRecommendations.map((recommendation: IRecommendation) => {
                    return (
                        <RecommendationCardContainer key={recommendation.id}>
                            <CardRecommendationWide
                                isFull={true}
                                recommendation={recommendation}
                                isHighlighted={false}
                            />
                        </RecommendationCardContainer>
                    )
                })}
            <Pagination
                page={currentPage ? currentPage : 0}
                count={currentPageCount ? currentPageCount : 0}
                variant="outlined"
                shape="rounded"
                onChange={handlePagination}
            />
        </ListContainer>
    )
}

export default HomeNewRecommendations
