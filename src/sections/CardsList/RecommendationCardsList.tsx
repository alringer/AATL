import RecommendationCard from 'components/RecommendationCard/RecommendationCard'
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
                <RecommendationCardContainer key={recommendation.recommendationID}>
                    <RecommendationCard
                        isFull={isFull}
                        recommendationID={recommendation.recommendationID}
                        recommendationImage={recommendation.recommendationImage}
                        placeName={recommendation.placeName}
                        placeAddress={recommendation.placeAddress}
                        placeCategories={recommendation.placeCategories}
                        recommendationTitle={recommendation.recommendationTitle}
                        recommendationDescription={recommendation.recommendationDescription}
                        recommendationAuthorName={recommendation.recommendationAuthorName}
                        recommendationAuthorTitle={recommendation.recommendationAuthorTitle}
                    />
                </RecommendationCardContainer>
            ))}
        </ListContainer>
    )
}

export default RecommendationCardsList
