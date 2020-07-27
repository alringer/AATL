import Pagination from '@material-ui/lab/Pagination'
import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import React from 'react'
import { IRecommendation } from 'utilities/types/recommendation'
import { IVenueRecommendationsInformation } from 'utilities/types/venue'
import { ListContainer, ListSubTitle, ListTitle, RecommendationCardContainer } from './List.style'

interface IRecommendationCardsListProps {
    isFull: boolean
    title: string
    subTitle: string
    venueRecommendationsInformation: IVenueRecommendationsInformation | null
    pageNumber: number | null
    pageSize: number | null
    totalCount: number | null
}

const RecommendationCardsList: React.FC<IRecommendationCardsListProps> = ({
    isFull,
    title,
    subTitle,
    venueRecommendationsInformation,
    pageNumber,
    pageSize,
    totalCount,
}) => {
    const [currentPage, setCurrentPage] = React.useState(pageNumber ? pageNumber + 1 : null)
    const [currentCount, setCurrentCount] = React.useState(
        totalCount && pageSize ? Math.ceil(Number(totalCount / pageSize)) : null
    )

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // TODO: Call API to paginate recommendations
    }

    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            {venueRecommendationsInformation && venueRecommendationsInformation.items
                ? venueRecommendationsInformation.items.map((recommendation: IRecommendation) => (
                      <RecommendationCardContainer key={recommendation.id}>
                          <CardRecommendationWide isFull={isFull} recommendation={recommendation} />
                      </RecommendationCardContainer>
                  ))
                : null}
            {currentPage && currentCount && (
                <Pagination
                    page={currentPage ? currentPage : 0}
                    count={currentCount ? currentCount : 0}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePageChange}
                />
            )}
        </ListContainer>
    )
}

export default RecommendationCardsList
