import EllipsesSVG from 'assets/ellipses-icon.svg'
import GrayEllipsesSVG from 'assets/gray-ellipses-icon.svg'
import GrayHeartSVG from 'assets/gray-heart-icon.svg'
import HeartSVG from 'assets/heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import Media from 'react-media'
import { ImageButtonsContainer, RecommendationIcon } from 'style/Card/Card.style'
import { query } from 'style/device'
import { chopStringLargeRecommendation } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
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
    RecommendationRestaurantAddressText,
    RecommendationRestaurantCategoryText,
    RecommendationRestaurantNameText,
    RecommendationSummaryText,
    RecommendationTitleText,
} from './RecommendationCardLarge.style'

interface ILargeRecommendationCardProps {
    recommendationID: number
    recommendationImage: string
    restaurantName: string
    restaurantAddress: string
    restaurantCategories: string[]
    recommendationTitle: string
    recommendationDescription: string
    recommendationAuthorName: string
    recommendationAuthorTitle: string
}

const LargeRecommendationCard: React.FC<ILargeRecommendationCardProps> = ({
    recommendationID,
    recommendationImage,
    restaurantName,
    restaurantAddress,
    restaurantCategories,
    recommendationTitle,
    recommendationDescription,
    recommendationAuthorName,
    recommendationAuthorTitle,
}) => {
    const handleView = () => {
        // TODO: Take the user to the recommendation page
        console.log('Recommendation clicked. Take the user to the recommendation page with ID: ', recommendationID)
    }

    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the recommendation
        e.stopPropagation()
        console.log('Recommendation heart clicked. Recommendation ID: ', recommendationID)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        e.stopPropagation()
        console.log('Recommendation ellipses clicked. Recommendation ID: ', recommendationID)
    }

    return (
        <RecommendationCardContainer onClick={handleView}>
            <RecommendationCardImageContainer>
                <Image src={recommendationImage} alt="recommendation-image" />
                <Media queries={query} defaultMatches={{ mobile: true }}>
                    {(matches) => (
                        <>
                            {matches.mobile && (
                                <ImageButtonsContainer>
                                    <RecommendationIcon onClick={handleMore}>
                                        <Image src={GrayEllipsesSVG} alt="ellipses-icon" />
                                    </RecommendationIcon>
                                    <RecommendationIcon onClick={handleLike}>
                                        <Image src={GrayHeartSVG} alt="heart-icon" />
                                    </RecommendationIcon>
                                </ImageButtonsContainer>
                            )}
                        </>
                    )}
                </Media>
            </RecommendationCardImageContainer>
            <RecommendationCardContentContainer>
                <RecommendationContentTopContainer>
                    <RecommendationHeaderContainer>
                        <RecommendationRestaurantNameText>{restaurantName}</RecommendationRestaurantNameText>
                        <Media queries={query} defaultMatches={{ mobile: true }}>
                            {(matches) => (
                                <>
                                    {(matches.laptop || matches.tablet) && (
                                        <RecommendationButtonsContainer>
                                            <RecommendationIcon onClick={handleLike}>
                                                <Image src={HeartSVG} alt="heart-icon" />
                                            </RecommendationIcon>
                                            <RecommendationIcon onClick={handleMore}>
                                                <Image src={EllipsesSVG} alt="ellipses-icon" />
                                            </RecommendationIcon>
                                        </RecommendationButtonsContainer>
                                    )}
                                </>
                            )}
                        </Media>
                    </RecommendationHeaderContainer>
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) => (
                            <>
                                {(matches.laptop || matches.tablet) && (
                                    <RecommendationRestaurantAddressText>
                                        {restaurantAddress}
                                    </RecommendationRestaurantAddressText>
                                )}
                            </>
                        )}
                    </Media>
                    <RecommendationRestaurantCategoryText>
                        {concatCategories(restaurantCategories)}
                    </RecommendationRestaurantCategoryText>
                </RecommendationContentTopContainer>
                <RecommendationContentMiddleContainer>
                    <RecommendationTitleText>{recommendationTitle}</RecommendationTitleText>
                    <RecommendationSummaryText>
                        {chopStringLargeRecommendation(recommendationDescription)}
                    </RecommendationSummaryText>
                </RecommendationContentMiddleContainer>
                <RecommendationContentBottomContainer>
                    <RecommendationAuthorNameText>{recommendationAuthorName}</RecommendationAuthorNameText>
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) => (
                            <>
                                {(matches.laptop || matches.tablet) && (
                                    <RecommendationAuthorTitleText>
                                        {recommendationAuthorTitle}
                                    </RecommendationAuthorTitleText>
                                )}
                            </>
                        )}
                    </Media>
                </RecommendationContentBottomContainer>
            </RecommendationCardContentContainer>
        </RecommendationCardContainer>
    )
}

export default LargeRecommendationCard
