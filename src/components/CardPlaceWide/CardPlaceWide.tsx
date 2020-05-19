import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import EllipsesSVG from 'assets/horizontalEllipses.svg'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import { CardIcon, TooltipIcon, WideHeaderLeftContainer, WideHeaderTooltipIconsContainer } from 'style/Card/Card.style'
import { query } from 'style/device'
import { chopStringFullRecommendationDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import {
    CardPlaceWideAuthorTitleText,
    CardPlaceWideButtonsContainer,
    CardPlaceWideCardContainer,
    CardPlaceWideCardContentContainer,
    CardPlaceWideCardImageContainer,
    CardPlaceWideContentBottomContainer,
    CardPlaceWideContentMiddleContainer,
    CardPlaceWideContentTopContainer,
    CardPlaceWideHeaderContainer,
    CardPlaceWidePlaceCategoryText,
    CardPlaceWidePlaceNameText,
    CardPlaceWideSummaryText,
} from './CardPlaceWide.style'

const CardPlaceWide = () => {
    const placeName = "Nakamura's"
    const placeCategories = ['BBQ', 'SUSHI']
    const recommendationDescription =
        'DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! DESCRIPTION! '
    const recommendationAuthorTitle = 'RECOMMENDED 128 TIMES'

    const handleView = () => {
        console.log('View a place from wide place card')
    }

    const handleMore = () => {
        console.log('handle more:')
    }

    return (
        <CardPlaceWideCardContainer onClick={handleView}>
            <CardPlaceWideCardImageContainer>
                <Image src={PlaceImage} alt="recommendation-image" />
            </CardPlaceWideCardImageContainer>
            <CardPlaceWideCardContentContainer>
                <CardPlaceWideContentTopContainer>
                    <CardPlaceWideHeaderContainer>
                        <WideHeaderLeftContainer>
                            <CardPlaceWidePlaceNameText>{placeName}</CardPlaceWidePlaceNameText>
                            <WideHeaderTooltipIconsContainer>
                                <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                    <TooltipIcon>
                                        <Image src={AuthoredSVG} alt="authored-icon" />
                                    </TooltipIcon>
                                </Tooltip>
                                <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                    <TooltipIcon>
                                        <Image src={AddedSVG} alt="added-icon" />
                                    </TooltipIcon>
                                </Tooltip>
                            </WideHeaderTooltipIconsContainer>
                        </WideHeaderLeftContainer>
                        <Media queries={query} defaultMatches={{ mobile: true }}>
                            {(matches) => (
                                <>
                                    {(matches.laptop || matches.tablet) && (
                                        <CardPlaceWideButtonsContainer>
                                            <CardIcon onClick={handleMore}>
                                                <Image src={EllipsesSVG} alt="ellipses-icon" />
                                            </CardIcon>
                                        </CardPlaceWideButtonsContainer>
                                    )}
                                </>
                            )}
                        </Media>
                    </CardPlaceWideHeaderContainer>
                    <CardPlaceWidePlaceCategoryText>{concatCategories(placeCategories)}</CardPlaceWidePlaceCategoryText>
                </CardPlaceWideContentTopContainer>
                <CardPlaceWideContentMiddleContainer>
                    <CardPlaceWideSummaryText>
                        {chopStringFullRecommendationDescription(recommendationDescription)}
                    </CardPlaceWideSummaryText>
                </CardPlaceWideContentMiddleContainer>
                <CardPlaceWideContentBottomContainer>
                    <CardPlaceWideAuthorTitleText>{recommendationAuthorTitle}</CardPlaceWideAuthorTitleText>
                </CardPlaceWideContentBottomContainer>
            </CardPlaceWideCardContentContainer>
        </CardPlaceWideCardContainer>
    )
}

export default CardPlaceWide
