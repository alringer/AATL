import RecommendationsListsCard from 'components/RecommendationsLists/RecommendationsListsCard/RecommendationsListsCard'
import React from 'react'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import {
    RecommendationsListsCardsContainer,
    RecommendationsListsCardsRowContainer,
} from './RecommendationsListsCards.style'

interface IRecommendationsListsCardsProps {
    recommendationsLists: IRecommendationListMeta[]
}

const RecommendationsListsCards: React.FC<IRecommendationsListsCardsProps> = ({ recommendationsLists }) => {
    return (
        <RecommendationsListsCardsContainer>
            {recommendationsLists.map((recommendationsList) => {
                return (
                    <RecommendationsListsCardsRowContainer>
                        <RecommendationsListsCard recommendationsList={recommendationsList} />
                    </RecommendationsListsCardsRowContainer>
                )
            })}
        </RecommendationsListsCardsContainer>
    )
}

export default RecommendationsListsCards
