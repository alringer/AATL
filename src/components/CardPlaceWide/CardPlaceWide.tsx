import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import EllipsesSVG from 'assets/horizontalEllipses.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import FlagButton from 'components/CardButtons/FlagButton'
import RemoveFromListButton from 'components/CardButtons/RemoveFromListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import Image from 'components/Image/Image'
import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import { RecommendationModalPlaceInformation } from 'store/recommendationModal/recommendationModal_types'
import {
    CardIcon,
    MobileActionButtonsContainer,
    MobileButtonsContainer,
    MoreHorizontalContainer,
    MoreVerticalContainer,
    WideHeaderLeftContainer,
    WideHeaderTooltipIconsContainer,
    WidePlaceAddressText,
} from 'style/Card/Card.style'
import { query } from 'style/device'
import { chopStringFullRecommendationDescription } from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
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

export enum CardPlaceWideEnum {
    City,
    Search,
    Profile,
}

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
}
interface ICardPlaceWideProps extends IReduxProps {
    place: IVenue
    type: CardPlaceWideEnum
}

const CardPlaceWide: React.FC<ICardPlaceWideProps> = ({ place, type, openRecommendationModal }) => {
    const router = useRouter()
    const [isMoreVisible, setMoreVisible] = React.useState(false)

    // React.useEffect(() => {
    //     console.log('Place Card: ', place)
    // }, [place])

    const handleView = () => {
        console.log('View a place from wide place card')
        router.push(`${R.ROUTE_ITEMS.restaurant}/${place.id}`)
    }
    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id') && _.has(place, 'name')) {
            console.log('handleWriteRecommendation for place ID: ', place.id)
            openRecommendationModal({ placeID: place.id, placeName: place.name, isAATL: true })
        }
        e.stopPropagation()
    }
    const handleAddToList = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id')) {
            console.log('handleAddToList for place ID: ', place.id)
        }
        e.stopPropagation()
    }
    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id')) {
            console.log('handleShare for place ID: ', place.id)
        }
        e.stopPropagation()
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
    }

    const ViewMore = () => {
        return (
            <CardIcon onClick={handleMore}>
                {isMoreVisible ? (
                    <Image src={CloseSVG} alt="close-icon" />
                ) : (
                    <Image src={EllipsesSVG} alt="ellipses-icon" />
                )}
            </CardIcon>
        )
    }

    return (
        <CardPlaceWideCardContainer onClick={handleView} id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
            <CardPlaceWideCardImageContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                <Image src={place ? place.imageCDNUrl : null} alt="recommendation-image" />
            </CardPlaceWideCardImageContainer>
            <CardPlaceWideCardContentContainer>
                <CardPlaceWideContentTopContainer>
                    <CardPlaceWideHeaderContainer>
                        <WideHeaderLeftContainer>
                            <CardPlaceWidePlaceNameText>
                                {place && place.name ? place.name : null}
                                <WideHeaderTooltipIconsContainer>
                                    <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                        <img src={AuthoredSVG} />
                                    </Tooltip>
                                    <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                        <img src={AddedSVG} alt="added-icon" />
                                    </Tooltip>
                                </WideHeaderTooltipIconsContainer>
                            </CardPlaceWidePlaceNameText>
                        </WideHeaderLeftContainer>
                        <Media queries={query} defaultMatches={{ mobile: true }}>
                            {(matches) => (
                                <>
                                    {(matches.laptop || matches.tablet) && (
                                        <CardPlaceWideButtonsContainer>
                                            {isMoreVisible ? (
                                                <MoreHorizontalContainer>
                                                    {type === CardPlaceWideEnum.Profile ? (
                                                        <RemoveFromListButton handleClick={handleAddToList} />
                                                    ) : (
                                                        <AddToListButton handleClick={handleAddToList} />
                                                    )}
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
                                        </CardPlaceWideButtonsContainer>
                                    )}
                                </>
                            )}
                        </Media>
                    </CardPlaceWideHeaderContainer>
                    {type === CardPlaceWideEnum.Search && (
                        <WidePlaceAddressText>
                            {place && place.parentRegion && place.parentRegion.city
                                ? place.parentRegion.city + ', '
                                : null}
                            {place && place.parentRegion && place.parentRegion.state ? place.parentRegion.state : null}
                        </WidePlaceAddressText>
                    )}
                    <CardPlaceWidePlaceCategoryText>
                        {place && place.categories
                            ? concatCategories(place.categories.map((category: ICategory) => category.longName))
                            : null}
                    </CardPlaceWidePlaceCategoryText>
                </CardPlaceWideContentTopContainer>
                <CardPlaceWideContentMiddleContainer>
                    <CardPlaceWideSummaryText>
                        {place && place.content ? chopStringFullRecommendationDescription(place.content) : null}
                    </CardPlaceWideSummaryText>
                </CardPlaceWideContentMiddleContainer>
                <CardPlaceWideContentBottomContainer>
                    <CardPlaceWideAuthorTitleText>
                        {`${S.PLACE_CARD.Recommended} ${
                            place && place.recommendations && place.recommendations.items
                                ? place.recommendations.items.length
                                : 0
                        } ${S.PLACE_CARD.Times}`}
                    </CardPlaceWideAuthorTitleText>
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) =>
                            matches.mobile && (
                                <MobileButtonsContainer>
                                    {isMoreVisible ? (
                                        <MobileActionButtonsContainer>
                                            {type === CardPlaceWideEnum.Profile ? (
                                                <RemoveFromListButton handleClick={handleAddToList} isMobile={true} />
                                            ) : (
                                                <AddToListButton handleClick={handleAddToList} isMobile={true} />
                                            )}
                                            <WriteRecommendationButton
                                                handleClick={handleWriteRecommendation}
                                                isMobile={true}
                                            />
                                            <ShareButton handleClick={handleShare} isMobile={true} />
                                            <FlagButton handleClick={handleShare} isMobile={true} />
                                        </MobileActionButtonsContainer>
                                    ) : null}
                                    <ViewMore />
                                </MobileButtonsContainer>
                            )
                        }
                    </Media>
                </CardPlaceWideContentBottomContainer>
            </CardPlaceWideCardContentContainer>
        </CardPlaceWideCardContainer>
    )
}

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(CardPlaceWide)
