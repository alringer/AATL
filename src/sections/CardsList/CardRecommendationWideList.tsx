import Pagination from '@material-ui/lab/Pagination'
import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import _ from 'lodash'
import React from 'react'
import { IRecommendation } from 'utilities/types/recommendation'
import { IVenueRecommendationsInformation } from 'utilities/types/venue'
import { ListContainer, ListSubTitle, ListTitle, RecommendationCardContainer } from './List.style'

interface IRecommendationCardsListProps {
    isFull: boolean
    title: string
    subTitle: string
    venueRecommendationsInformation: IVenueRecommendationsInformation
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
    const [currentPage, setCurrentPage] = React.useState(pageNumber + 1)

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        // TODO: Call API to paginate recommendations
    }

    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            {_.has(venueRecommendationsInformation, 'items')
                ? venueRecommendationsInformation.items.map((recommendation: IRecommendation) => (
                      <RecommendationCardContainer key={recommendation.id}>
                          <CardRecommendationWide isFull={isFull} recommendation={recommendation} />
                      </RecommendationCardContainer>
                  ))
                : null}
            <Pagination
                page={currentPage}
                count={Math.ceil(Number(totalCount / pageSize))}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
            />
        </ListContainer>
    )
}

export default RecommendationCardsList
