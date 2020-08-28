import React from 'react'
import { ListContainer, RecommendationCardContainer } from 'sections/CardsList/List.style'
import SpotlightedRecommendation from 'SpotlightedRecommendation/SpotlightedRecommendation'
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
    return (
        <ListContainer>
            {recommendationListMeta && recommendationListMeta.spotlightedRecommendations
                ? recommendationListMeta.spotlightedRecommendations.map(
                      (spotlightedRecommendation: ISpotlightedRecommendation) => (
                          <RecommendationCardContainer key={spotlightedRecommendation.id}>
                              <SpotlightedRecommendation
                                  recommendationListMeta={recommendationListMeta}
                                  spotlightedRecommendation={spotlightedRecommendation}
                                  fetchRecommendationListMeta={fetchRecommendationListMeta}
                              />
                          </RecommendationCardContainer>
                      )
                  )
                : null}
        </ListContainer>
    )
}

export default RecommendationListCards
