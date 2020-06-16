import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import React from 'react'
import { IRecommendation } from 'utilities/types/recommendation'
import { ListContainer, ListSubTitle, ListTitle, RecommendationCardContainer } from './List.style'

interface IRecommendationCardsListProps {
    isFull: boolean
    title: string
    subTitle: string
    recommendations: IRecommendation[]
}

const RecommendationCardsList: React.FC<IRecommendationCardsListProps> = ({
    isFull,
    title,
    subTitle,
    recommendations,
}) => {
    return (
        <ListContainer>
            <ListTitle>{title}</ListTitle>
            <ListSubTitle>{subTitle}</ListSubTitle>
            {recommendations.map((recommendation: IRecommendation) => (
                <RecommendationCardContainer key={recommendation.id}>
                    <CardRecommendationWide isFull={isFull} recommendation={recommendation} />
                </RecommendationCardContainer>
            ))}
        </ListContainer>
    )
}

export default RecommendationCardsList
