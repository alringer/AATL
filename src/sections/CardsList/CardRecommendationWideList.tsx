import Pagination from '@material-ui/lab/Pagination'
import CardRecommendationWide, { CardRecommendationWideEnum } from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { PAGINATE_RECOMMENDATIONS } from 'config/AxiosConfig'
import React from 'react'
import { IRecommendation } from 'utilities/types/recommendation'
import { IVenueRecommendationsInformation } from 'utilities/types/venue'
import { ListContainer, ListSubTitle, ListTitle, RecommendationCardContainer } from './List.style'

interface IRecommendationCardsListProps {
    highlightedRecommendationID: number | null
    isFull: boolean
    type: CardRecommendationWideEnum
    title: string
    subTitle: string
    venueRecommendationsInformation: IVenueRecommendationsInformation | null
    pageNumber: number | null
    pageSize: number | null
    totalCount: number | null
    placeID: number | null
}

const RecommendationCardsList: React.FC<IRecommendationCardsListProps> = ({
    isFull,
    title,
    type,
    subTitle,
    venueRecommendationsInformation,
    pageNumber,
    pageSize,
    totalCount,
    placeID,
    highlightedRecommendationID,
}) => {
    const [currentRecommendations, setCurrentRecommendations] = React.useState(
        venueRecommendationsInformation && venueRecommendationsInformation.items
            ? venueRecommendationsInformation.items
            : []
    )
    const [currentPage, setCurrentPage] = React.useState(0)
    const [currentPageCount, setCurrentPageCount] = React.useState(0)

    React.useEffect(() => {
        setCurrentPage(pageNumber + 1)
    }, [pageNumber])
    React.useEffect(() => {
        setCurrentPageCount(Math.ceil(Number(totalCount / pageSize)))
    }, [totalCount, pageSize])

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        if (value !== currentPage && placeID !== undefined && placeID !== null) {
            const newPage = value
            const queryPage = newPage - 1
            setCurrentPage(newPage)
            axios
                .get(PAGINATE_RECOMMENDATIONS(placeID, queryPage))
                .then((res) => {
                    setCurrentRecommendations(res.data)
                })
                .catch((err) => console.log(err))
        }
        // TODO: Call API to paginate recommendations
    }

    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            {currentRecommendations
                ? currentRecommendations.map((recommendation: IRecommendation) => (
                      <RecommendationCardContainer key={recommendation.id}>
                          <CardRecommendationWide
                              isFull={isFull}
                              type={type}
                              recommendation={recommendation}
                              isHighlighted={String(highlightedRecommendationID) === String(recommendation.id)}
                          />
                      </RecommendationCardContainer>
                  ))
                : null}
            {currentRecommendations && (
                <Pagination
                    page={currentPage ? currentPage : 0}
                    count={currentPageCount ? currentPageCount : 0}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            )}
        </ListContainer>
    )
}

export default RecommendationCardsList
