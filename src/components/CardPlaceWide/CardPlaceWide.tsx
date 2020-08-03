import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import EllipsesSVG from 'assets/horizontalEllipses.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import RemoveFromListButton from 'components/CardButtons/RemoveFromListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
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
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
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
    openListModal: (payload: OpenListModalPayload) => void
}
interface ICardPlaceWideProps extends IReduxProps, IWithAuthInjectedProps {
    place: IVenue
    type: CardPlaceWideEnum
}

const CardPlaceWide: React.FC<ICardPlaceWideProps> = ({
    place,
    type,
    openRecommendationModal,
    openListModal,
    authenticatedAction,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [isMoreVisible, setMoreVisible] = React.useState(false)
    const [placeLink, setPlaceLink] = React.useState('')

    React.useEffect(() => {
        if (window) {
            const link = `${window.location.origin}${R.ROUTE_ITEMS.restaurant}/${place.id}`
            setPlaceLink(link)
        }
    }, [place])

    const handleView = () => {
        console.log('View a place from wide place card')
        router.push(`${R.ROUTE_ITEMS.restaurant}/${place.id}`)
    }
    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id') && _.has(place, 'name')) {
            console.log('handleWriteRecommendation for place ID: ', place.id)
            authenticatedAction(() => {
                openRecommendationModal({
                    placeID: String(place.id),
                    placeName: place.name,
                    isAATL: true,
                })
            })
        }
        e.stopPropagation()
    }
    const handleAddToList = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id')) {
            authenticatedAction(() => {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.AddToRestaurantList,
                    placeID: place.id,
                }
                openListModal(openListModalPayload)
            })
        }
        e.stopPropagation()
    }
    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id') && placeLink) {
            navigator.clipboard
                .writeText(placeLink)
                .then(() => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.RESTAURANT_LINK_COPIED.Type}
                                    title={B.RESTAURANT_LINK_COPIED.Title}
                                    message={B.RESTAURANT_LINK_COPIED.Body}
                                />
                            </div>
                        ),
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
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
                                            {/* <FlagButton handleClick={handleShare} isMobile={true} /> */}
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

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal, openListModal }, dispatch)

export default reduxConnect(null, mapDispatchToProps)(withAuth(CardPlaceWide))
