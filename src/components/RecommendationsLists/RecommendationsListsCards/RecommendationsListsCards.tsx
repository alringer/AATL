import Pagination from '@material-ui/lab/Pagination'
import RecommendationsListsCard from 'components/RecommendationsLists/RecommendationsListsCard/RecommendationsListsCard'
import axios, { RECOMMENDATION_LIST_METAS_DETAILS } from 'config/AxiosConfig'
import React from 'react'
import { IRecommendationListMetaDetail } from 'utilities/types/recommendationListDetail'
import {
    RecommendationsListsCardsContainer,
    RecommendationsListsCardsRowContainer,
} from './RecommendationsListsCards.style'

interface IRecommendationsListsCardsProps {
    initialRecommendationsLists: IRecommendationListMetaDetail[]
    initialTotalPages: number
    initialPage: number
    initialPageSize: number
}

const RecommendationsListsCards: React.FC<IRecommendationsListsCardsProps> = ({
    initialRecommendationsLists,
    initialTotalPages,
    initialPage,
    initialPageSize,
}) => {
    const [currentRecommendationsLists, setCurrentRecommendationsLists] = React.useState<
        IRecommendationListMetaDetail[]
    >([])
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)
    const [currentPageSize, setCurrentPageSize] = React.useState(3)

    React.useEffect(() => {
        if (currentRecommendationsLists && currentRecommendationsLists.length > 0) {
            setCurrentRecommendationsLists(currentRecommendationsLists)
        } else {
            setCurrentRecommendationsLists([])
        }
    }, [initialRecommendationsLists])

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
            .get(RECOMMENDATION_LIST_METAS_DETAILS(page, currentPageSize))
            .then((res) => {
                setCurrentRecommendationsLists(res.data.content)
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
        <RecommendationsListsCardsContainer>
            {initialRecommendationsLists.map((recommendationsList: IRecommendationListMetaDetail) => {
                return (
                    <RecommendationsListsCardsRowContainer key={recommendationsList.id}>
                        <RecommendationsListsCard recommendationsList={recommendationsList} />
                    </RecommendationsListsCardsRowContainer>
                )
            })}
            <Pagination
                page={currentPage ? currentPage : 0}
                count={currentPageCount ? currentPageCount : 0}
                variant="outlined"
                shape="rounded"
                onChange={handlePagination}
            />
        </RecommendationsListsCardsContainer>
    )
}

export default RecommendationsListsCards
