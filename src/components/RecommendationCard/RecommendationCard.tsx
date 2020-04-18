import EllipsesSVG from 'assets/ellipses-icon.svg'
import HeartSVG from 'assets/heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import {
    RecommendationAuthorNameText,
    RecommendationAuthorTitleText,
    RecommendationButtonsContainer,
    RecommendationCardContainer,
    RecommendationCardContentContainer,
    RecommendationCardImageContainer,
    RecommendationContentBottomContainer,
    RecommendationContentMiddleContainer,
    RecommendationContentTopContainer,
    RecommendationHeaderContainer,
    RecommendationIcon,
    RecommendationRestaurantAddressText,
    RecommendationRestaurantCategoryText,
    RecommendationRestaurantNameText,
    RecommendationSummaryText,
    RecommendationTitleText,
} from './RecommendationCard.style'

interface IRecommendationCard {
    recommendationID: number
    recommendationImage: string
    restaurantName: string
    restaurantAddress: string
    restaurantCategories: string //TODO: Take in arrays of strings and format them
    recommendationTitle: string
    recommendationDescription: string
    recommendationAuthorName: string
    recommendationAuthorTitle: string
}

const RecommendationCard: React.FC<IRecommendationCard> = ({
    recommendationImage,
    restaurantName,
    restaurantAddress,
    restaurantCategories,
    recommendationTitle,
    recommendationDescription,
    recommendationAuthorName,
    recommendationAuthorTitle,
}) => {
    return (
        <RecommendationCardContainer>
            <RecommendationCardImageContainer>
                <Image src={recommendationImage} alt="recommendation-image" />
            </RecommendationCardImageContainer>
            <RecommendationCardContentContainer>
                <RecommendationContentTopContainer>
                    <RecommendationHeaderContainer>
                        <RecommendationRestaurantNameText>{restaurantName}</RecommendationRestaurantNameText>
                        <RecommendationButtonsContainer>
                            <RecommendationIcon>
                                <Image src={HeartSVG} alt="heart-icon" />
                            </RecommendationIcon>
                            <RecommendationIcon>
                                <Image src={EllipsesSVG} alt="ellipses-icon" />
                            </RecommendationIcon>
                        </RecommendationButtonsContainer>
                    </RecommendationHeaderContainer>
                    <RecommendationRestaurantAddressText>{restaurantAddress}</RecommendationRestaurantAddressText>
                    <RecommendationRestaurantCategoryText>{restaurantCategories}</RecommendationRestaurantCategoryText>
                </RecommendationContentTopContainer>
                <RecommendationContentMiddleContainer>
                    <RecommendationTitleText>{recommendationTitle}</RecommendationTitleText>
                    <RecommendationSummaryText>{recommendationDescription}</RecommendationSummaryText>
                </RecommendationContentMiddleContainer>
                <RecommendationContentBottomContainer>
                    <RecommendationAuthorNameText>{recommendationAuthorName}</RecommendationAuthorNameText>
                    <RecommendationAuthorTitleText>{recommendationAuthorTitle}</RecommendationAuthorTitleText>
                </RecommendationContentBottomContainer>
            </RecommendationCardContentContainer>
        </RecommendationCardContainer>
    )
}

export default RecommendationCard
