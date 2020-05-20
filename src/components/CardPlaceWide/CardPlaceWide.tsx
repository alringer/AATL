import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import EllipsesSVG from 'assets/horizontalEllipses.svg'
import PlaceImage from 'assets/mock-images/restaurant_image.jpg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import {
    CardIcon,
    MoreHorizontalContainer,
    MoreVerticalContainer,
    TooltipIcon,
    WideHeaderLeftContainer,
    WideHeaderTooltipIconsContainer,
} from 'style/Card/Card.style'
import { query } from 'style/device'
import { chopStringFullRecommendationDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { IPlace } from 'utilities/types/place'
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

interface ICardPlaceWideProps extends Partial<IPlace> {}

const CardPlaceWide: React.FC<ICardPlaceWideProps> = ({
    placeName,
    placeID,
    placeCategories,
    placeDescription,
    placeNumberOfRecommendations,
}) => {
    const [isMoreVisible, setMoreVisible] = React.useState(false)

    const handleView = () => {
        console.log('View a place from wide place card')
    }
    const handleWriteRecommendation = () => {
        console.log('handleWriteRecommendation for place ID: ', placeID)
    }
    const handleAddToList = () => {
        console.log('handleAddToList for place ID: ', placeID)
    }
    const handleShare = () => {
        console.log('handleShare for place ID: ', placeID)
    }

    const handleMore = () => {
        setMoreVisible(!isMoreVisible)
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
                                            {isMoreVisible ? (
                                                <MoreHorizontalContainer>
                                                    <AddToListButton handleClick={handleAddToList} />
                                                    <WriteRecommendationButton
                                                        handleClick={handleWriteRecommendation}
                                                    />
                                                </MoreHorizontalContainer>
                                            ) : null}
                                            {isMoreVisible ? (
                                                <MoreVerticalContainer>
                                                    <ShareButton handleClick={handleShare} />
                                                </MoreVerticalContainer>
                                            ) : null}
                                            <CardIcon onClick={handleMore}>
                                                {isMoreVisible ? (
                                                    <Image src={CloseSVG} alt="close-icon" />
                                                ) : (
                                                    <Image src={EllipsesSVG} alt="ellipses-icon" />
                                                )}
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
                        {chopStringFullRecommendationDescription(placeDescription)}
                    </CardPlaceWideSummaryText>
                </CardPlaceWideContentMiddleContainer>
                <CardPlaceWideContentBottomContainer>
                    <CardPlaceWideAuthorTitleText>
                        {S.PLACE_CARD.Recommended} {placeNumberOfRecommendations} {S.PLACE_CARD.Times}
                    </CardPlaceWideAuthorTitleText>
                </CardPlaceWideContentBottomContainer>
            </CardPlaceWideCardContentContainer>
        </CardPlaceWideCardContainer>
    )
}

export default CardPlaceWide
