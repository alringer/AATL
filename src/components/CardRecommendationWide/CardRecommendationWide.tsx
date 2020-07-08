import { Tooltip } from '@material-ui/core'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import ExpandSVG from 'assets/expand-icon.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import FlagButton from 'components/CardButtons/FlagButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import Image from 'components/Image/Image'
import * as S from 'constants/StringConstants'
import React from 'react'
import Media from 'react-media'
import {
    CardIcon,
    MobileActionButtonsContainer,
    MobileButtonsContainer,
    MoreHorizontalContainer,
    MoreVerticalContainer,
    WideHeaderTooltipIconsContainer,
} from 'style/Card/Card.style'
import { query } from 'style/device'
import {
    chopStringFullRecommendationDescription,
    chopStringRecommendationTitle,
    chopStringSimpleRecommendationDescription,
} from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { ICategory } from 'utilities/types/category'
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
} from './CardRecommendationWide.style'

interface IRecommendationCardProps {
    isFull: boolean
    recommendation: IRecommendation
}

const CardRecommendationWide: React.FC<IRecommendationCardProps> = ({
    isFull,
    recommendation,
    // recommendationID,
    // recommendationImage,
    // placeName,
    // placeAddress,
    // placeCategories,
    // recommendationTitle,
    // recommendationDescription,
    // recommendationAuthorName,
    // recommendationAuthorTitle,
}) => {
    const [isMoreVisible, setMoreVisible] = React.useState(false)

    const handleView = () => {
        // TODO: Take the user to the recommendation page
        console.log('Recommendation clicked. Take the user to the recommendation page with ID: ', recommendation.id)
    }

    const handleFlag = () => {
        console.log('Handle flag content')
    }

    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the recommendation
        e.stopPropagation()
        console.log('Recommendation heart clicked. Recommendation ID: ', recommendation.id)
    }

    const handleAddToList = () => {
        console.log('handleAddToList clicked in the recommendation card with id: ', recommendation.id)
    }
    const handleWriteRecommendation = () => {
        console.log('handleWriteRecommendation clicked in the recommendation card with id: ', recommendation.id)
    }
    const handleShare = () => {
        console.log('handleShare clicked in the recommendation card with id: ', recommendation.id)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
        console.log('Recommendation ellipses clicked. Recommendation ID: ', recommendation.id)
    }

    const ViewMore = () => {
        return (
            <CardIcon onClick={handleMore}>
                {isMoreVisible ? (
                    <Image src={CloseSVG} alt="close-icon" />
                ) : (
                    <Image src={ExpandSVG} alt="expand-icon" />
                )}
            </CardIcon>
        )
    }

    return (
        <RecommendationCardContainer onClick={handleView} id={isMoreVisible ? 'toggled' : 'not-toggled'}>
            <RecommendationCardImageContainer id={isMoreVisible ? 'toggled' : 'not-toggled'}>
                <Image src={recommendation ? recommendation.imageCDNUrl : ''} alt="recommendation-image" />
            </RecommendationCardImageContainer>
            <RecommendationCardContentContainer>
                <RecommendationContentTopContainer>
                    <RecommendationHeaderContainer>
                        <RecommendationPlaceNameText>
                            {isFull === true
                                ? recommendation.venue.name
                                : isMoreVisible
                                ? recommendation.title
                                : chopStringRecommendationTitle(recommendation.title)}
                            <WideHeaderTooltipIconsContainer>
                                <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                    <img src={AuthoredSVG} />
                                </Tooltip>
                                <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                    <img src={AddedSVG} alt="added-icon" />
                                </Tooltip>
                            </WideHeaderTooltipIconsContainer>
                        </RecommendationPlaceNameText>
                        <Media queries={query} defaultMatches={{ laptop: true }}>
                            {(matches) => (
                                <>
                                    {(matches.laptop || matches.tablet) && (
                                        <RecommendationButtonsContainer>
                                            {isMoreVisible ? (
                                                <MoreHorizontalContainer>
                                                    {/* {type === CardPlaceWideEnum.Profile ? (
                                                        <RemoveFromListButton handleClick={handleAddToList} />
                                                    ) : (
                                                        )} */}
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
                                            <ViewMore />
                                        </RecommendationButtonsContainer>
                                    )}
                                </>
                            )}
                        </Media>
                    </RecommendationHeaderContainer>
                    {isFull === true && (
                        <>
                            <Media queries={query} defaultMatches={{ laptop: true }}>
                                {(matches) => (
                                    <>
                                        {(matches.laptop || matches.tablet) && (
                                            <RecommendationPlaceAddressText>
                                                {recommendation.venue.formattedAddress}
                                            </RecommendationPlaceAddressText>
                                        )}
                                    </>
                                )}
                            </Media>
                            <RecommendationPlaceCategoryText>
                                {concatCategories(
                                    recommendation.venue.categories.map((category: ICategory) => {
                                        return category.longName
                                    })
                                )}
                            </RecommendationPlaceCategoryText>
                        </>
                    )}
                </RecommendationContentTopContainer>
                <RecommendationContentMiddleContainer>
                    {isFull === true && (
                        <RecommendationTitleText>
                            {isMoreVisible ? recommendation.title : chopStringRecommendationTitle(recommendation.title)}
                        </RecommendationTitleText>
                    )}
                    <RecommendationSummaryText>
                        {isMoreVisible
                            ? recommendation.content
                            : isFull === true
                            ? chopStringFullRecommendationDescription(recommendation.content)
                            : chopStringSimpleRecommendationDescription(recommendation.content)}
                    </RecommendationSummaryText>
                </RecommendationContentMiddleContainer>
                <RecommendationContentBottomContainer>
                    <RecommendationAuthorNameText>{recommendation.createdBy.fullname}</RecommendationAuthorNameText>
                    <RecommendationAuthorTitleText>{recommendation.createdBy.userByLine}</RecommendationAuthorTitleText>
                    <Media queries={query} defaultMatches={{ laptop: true }}>
                        {(matches) =>
                            matches.mobile && (
                                <MobileButtonsContainer>
                                    {isMoreVisible ? (
                                        <MobileActionButtonsContainer>
                                            {/* {type === CardPlaceWideEnum.Profile ? (
                                                <RemoveFromListButton handleClick={handleAddToList} isMobile={true} />
                                            ) : (
                                                )} */}
                                            <AddToListButton handleClick={handleAddToList} isMobile={true} />
                                            <WriteRecommendationButton
                                                handleClick={handleWriteRecommendation}
                                                isMobile={true}
                                            />
                                            <ShareButton handleClick={handleShare} isMobile={true} />
                                            <FlagButton handleClick={handleFlag} isMobile={true} />
                                        </MobileActionButtonsContainer>
                                    ) : null}
                                    <ViewMore />
                                </MobileButtonsContainer>
                            )
                        }
                    </Media>
                </RecommendationContentBottomContainer>
            </RecommendationCardContentContainer>
        </RecommendationCardContainer>
    )
}

export default CardRecommendationWide
