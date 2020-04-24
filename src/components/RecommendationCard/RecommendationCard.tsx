import EllipsesSVG from 'assets/ellipses-icon.svg'
import GrayEllipsesSVG from 'assets/gray-ellipses-icon.svg'
import GrayHeartSVG from 'assets/gray-heart-icon.svg'
import HeartSVG from 'assets/heart-icon.svg'
import Image from 'components/Image/Image'
import React from 'react'
import Media from 'react-media'
import { ImageButtonsContainer, RecommendationIcon } from 'style/Card/Card.style'
import { query } from 'style/device'
import {
    chopStringFullRecommendationDescription,
    chopStringRecommendationTitle,
    chopStringSimpleRecommendationDescription,
} from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { IRecommendation } from 'utilities/types/recommendation'
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
    RecommendationPlaceAddressText,
    RecommendationPlaceCategoryText,
    RecommendationPlaceNameText,
    RecommendationSummaryText,
    RecommendationTitleText,
} from './RecommendationCard.style'

interface IRecommendationCardProps extends IRecommendation {
    isFull: boolean
}

const RecommendationCard: React.FC<IRecommendationCardProps> = ({
    isFull,
    recommendationID,
    recommendationImage,
    placeName,
    placeAddress,
    placeCategories,
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
                        <RecommendationPlaceNameText>
                            {isFull === true ? placeName : chopStringRecommendationTitle(recommendationTitle)}
                        </RecommendationPlaceNameText>
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
                    {isFull === true && (
                        <>
                            <Media queries={query} defaultMatches={{ mobile: true }}>
                                {(matches) => (
                                    <>
                                        {(matches.laptop || matches.tablet) && (
                                            <RecommendationPlaceAddressText>
                                                {placeAddress}
                                            </RecommendationPlaceAddressText>
                                        )}
                                    </>
                                )}
                            </Media>
                            <RecommendationPlaceCategoryText>
                                {concatCategories(placeCategories)}
                            </RecommendationPlaceCategoryText>
                        </>
                    )}
                </RecommendationContentTopContainer>
                <RecommendationContentMiddleContainer>
                    {isFull === true && (
                        <RecommendationTitleText>
                            {chopStringRecommendationTitle(recommendationTitle)}
                        </RecommendationTitleText>
                    )}
                    <RecommendationSummaryText>
                        {isFull === true
                            ? chopStringFullRecommendationDescription(recommendationDescription)
                            : chopStringSimpleRecommendationDescription(recommendationDescription)}
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

export default RecommendationCard
