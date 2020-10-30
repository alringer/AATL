import Pagination from '@material-ui/lab/Pagination'
import SpotlightedRecommendation from 'components/SpotlightedRecommendation/SpotlightedRecommendation'
import axios, { RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATIONS } from 'config/AxiosConfig'
import React from 'react'
import { ListContainer, RecommendationCardContainer } from 'sections/CardsList/List.style'
import { ISpotlightedRecommendation } from 'utilities/types/ISpotlightedRecommendation'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IRecommendationListCardsProps {
    recommendationListMeta: IRecommendationListMeta | null
    fetchRecommendationListMeta: () => void
}

const RecommendationListCards: React.FC<IRecommendationListCardsProps> = ({
    recommendationListMeta,
    fetchRecommendationListMeta,
}) => {
    const [currentRecommendations, setCurrentRecommendations] = React.useState<ISpotlightedRecommendation[]>([])
    const [currentPage, setCurrentPage] = React.useState(1)
    const [currentPageCount, setCurrentPageCount] = React.useState(1)
    const [currentPageSize, setCurrentPageSize] = React.useState(3)

    React.useEffect(() => {
        fetchRecommendations(0)
    }, [])

    const fetchRecommendations = (page: number) => {
        if (recommendationListMeta && recommendationListMeta.id !== undefined && recommendationListMeta.id !== null) {
            axios
                .get(RECOMMENDATION_LIST_SPOTLIGHTED_RECOMMENDATIONS(recommendationListMeta.id, page, currentPageSize))
                .then((res) => {
                    setCurrentRecommendations(res.data.content)
                    setCurrentPage(res.data.number + 1)
                    setCurrentPageSize(res.data.size)
                    setCurrentPageCount(res.data.totalPages)
                })
                .catch((err) => console.log(err))
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchRecommendations(value - 1)
    }

    return (
        <ListContainer>
            {currentRecommendations
                ? currentRecommendations.map((spotlightedRecommendation: ISpotlightedRecommendation) => (
                      <RecommendationCardContainer key={spotlightedRecommendation.id}>
                          <SpotlightedRecommendation
                              recommendationListMeta={recommendationListMeta}
                              spotlightedRecommendation={spotlightedRecommendation}
                              fetchRecommendationListMeta={fetchRecommendationListMeta}
                          />
                      </RecommendationCardContainer>
                  ))
                : null}
            {currentRecommendations && currentRecommendations.length > 0 && (
                <Pagination
                    page={currentPage ? currentPage : 0}
                    count={currentPageCount ? currentPageCount : 0}
                    variant="outlined"
                    shape="rounded"
                    onChange={handlePagination}
                />
            )}
        </ListContainer>
    )
}

export default RecommendationListCards
