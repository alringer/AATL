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
import axios, { FETCH_RECOMMENDATION } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
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
    RecommendationTitleSpan,
    RecommendationTitleText,
} from './CardRecommendationWide.style'

interface IRecommendationCardProps {
    isFull: boolean
    recommendation: IRecommendation
}

const CardRecommendationWide: React.FC<IRecommendationCardProps> = ({ isFull, recommendation }) => {
    const [currentRecommendation, setCurrentRecommendation] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [isMoreVisible, setMoreVisible] = React.useState(false)

    React.useEffect(() => {
        setLoading(true)
        if (_.has(recommendation, 'id')) {
            axios
                .get(FETCH_RECOMMENDATION(recommendation.id))
                .then((res) => {
                    console.log(res)
                    setCurrentRecommendation(res.data)
                })
                .catch((err) => console.log(err))
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    const handleFlag = (e: React.MouseEvent<HTMLElement>) => {
        console.log('Handle flag content')
        e.stopPropagation()
    }

    const handleLike = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Call API to like the recommendation
        if (currentRecommendation) {
            console.log('Recommendation heart clicked. Recommendation ID: ', currentRecommendation.id)
        }
        e.stopPropagation()
    }

    const handleAddToList = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation) {
            console.log('handleAddToList clicked in the recommendation card with id: ', currentRecommendation.id)
        }
        e.stopPropagation()
    }
    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation) {
            console.log(
                'handleWriteRecommendation clicked in the recommendation card with id: ',
                currentRecommendation.id
            )
        }
        e.stopPropagation()
    }
    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation) {
            console.log('handleShare clicked in the recommendation card with id: ', currentRecommendation.id)
        }
        e.stopPropagation()
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        // TODO: Display more options
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
        if (currentRecommendation) {
            console.log('Recommendation ellipses clicked. Recommendation ID: ', currentRecommendation.id)
        }
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

    return currentRecommendation ? (
        <RecommendationCardContainer onClick={handleMore} id={isMoreVisible ? 'toggled' : 'not-toggled'}>
            <RecommendationCardImageContainer id={isMoreVisible ? 'toggled' : 'not-toggled'}>
                <Image src={recommendation ? recommendation.imageCDNUrl : ''} alt="recommendation-image" />
            </RecommendationCardImageContainer>
            <RecommendationCardContentContainer>
                <RecommendationContentTopContainer>
                    <RecommendationHeaderContainer>
                        <RecommendationPlaceNameText>
                            <RecommendationTitleSpan>
                                {isFull === true
                                    ? currentRecommendation &&
                                      currentRecommendation.venue &&
                                      currentRecommendation.venue.name
                                        ? currentRecommendation.venue.name
                                        : ''
                                    : isMoreVisible
                                    ? currentRecommendation && currentRecommendation.title
                                        ? currentRecommendation.title
                                        : ''
                                    : currentRecommendation && currentRecommendation.title
                                    ? chopStringRecommendationTitle(currentRecommendation.title)
                                    : ''}
                            </RecommendationTitleSpan>
                            <WideHeaderTooltipIconsContainer>
                                <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                    <img src={AuthoredSVG} />
                                </Tooltip>
                                <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                    <img src={AddedSVG} alt="added-icon" />
                                </Tooltip>
                            </WideHeaderTooltipIconsContainer>
                        </RecommendationPlaceNameText>
                        <Media queries={query} defaultMatches={{ mobile: true }}>
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
                            <Media queries={query} defaultMatches={{ mobile: true }}>
                                {(matches) => (
                                    <>
                                        {(matches.laptop || matches.tablet) && (
                                            <RecommendationPlaceAddressText>
                                                {_.has(currentRecommendation, 'venue.formattedAddress')
                                                    ? currentRecommendation.venue.formattedAddress
                                                    : ''}
                                            </RecommendationPlaceAddressText>
                                        )}
                                    </>
                                )}
                            </Media>
                            <RecommendationPlaceCategoryText>
                                {currentRecommendation &&
                                currentRecommendation.venue &&
                                currentRecommendation.venue.categories
                                    ? concatCategories(
                                          currentRecommendation.venue.categories.map((category: ICategory) => {
                                              return category.longName
                                          })
                                      )
                                    : ''}
                            </RecommendationPlaceCategoryText>
                        </>
                    )}
                </RecommendationContentTopContainer>
                <RecommendationContentMiddleContainer>
                    {isFull === true && (
                        <RecommendationTitleText>
                            {isMoreVisible
                                ? currentRecommendation.title
                                : chopStringRecommendationTitle(currentRecommendation.title)}
                        </RecommendationTitleText>
                    )}
                    <RecommendationSummaryText>
                        {isMoreVisible
                            ? currentRecommendation && currentRecommendation.content
                                ? currentRecommendation.content
                                : ''
                            : isFull === true
                            ? currentRecommendation && currentRecommendation.content
                                ? chopStringFullRecommendationDescription(currentRecommendation.content)
                                : ''
                            : currentRecommendation && currentRecommendation.content
                            ? chopStringSimpleRecommendationDescription(currentRecommendation.content)
                            : ''}
                    </RecommendationSummaryText>
                </RecommendationContentMiddleContainer>
                <RecommendationContentBottomContainer>
                    <RecommendationAuthorNameText>
                        {_.has(currentRecommendation, 'createdBy.firstName') &&
                        _.has(currentRecommendation, 'createdBy.lastName')
                            ? currentRecommendation.createdBy.firstName + ' ' + currentRecommendation.createdBy.lastName
                            : ''}
                    </RecommendationAuthorNameText>
                    <RecommendationAuthorTitleText>
                        {_.has(currentRecommendation, 'createdBy.userByLine')
                            ? currentRecommendation.createdBy.userByLine
                            : ''}
                    </RecommendationAuthorTitleText>
                    <Media queries={query} defaultMatches={{ mobile: true }}>
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
    ) : null
}

export default CardRecommendationWide
