import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import ExpandSVG from 'assets/expand-icon.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import RemoveFromListButton from 'components/CardButtons/RemoveFromListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
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
import { deviceNames, query, size } from 'style/device'
import {
    chopStringPlaceCategoriesLaptop,
    chopStringPlaceCategoriesMobile,
    chopStringPlaceCategoriesTablet,
    chopStringPlaceLatestRecommendationContentLaptop,
    chopStringPlaceLatestRecommendationContentMobile,
    chopStringPlaceLatestRecommendationContentTablet,
    chopStringPlaceLatestRecommendationTitleLaptop,
    chopStringPlaceLatestRecommendationTitleMobile,
    chopStringPlaceLatestRecommendationTitleTablet,
    chopStringPlaceNameLaptop,
    chopStringPlaceNameMobile,
    chopStringPlaceNameTablet,
    chopStringPlaceUserByLineLaptop,
    chopStringPlaceUserByLineMobile,
    chopStringPlaceUserByLineTablet,
    chopStringPlaceUserNameLaptop,
    chopStringPlaceUserNameMobile,
    chopStringPlaceUserNameTablet,
    chopStringSearchPlaceCategoriesLaptop,
    chopStringSearchPlaceCategoriesTablet,
    chopStringSearchPlaceLatestRecommendationContentLaptop,
    chopStringSearchPlaceLatestRecommendationContentTablet,
    chopStringSearchPlaceLatestRecommendationTitleLaptop,
    chopStringSearchPlaceLatestRecommendationTitleTablet,
    chopStringSearchPlaceNameLaptop,
    chopStringSearchPlaceNameTablet,
} from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
import {
    CardPlaceWideAuthorNameText,
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
    CardPlaceWideTitleText,
} from './CardPlaceWide.style'

export enum CardPlaceWideEnum {
    City,
    Search,
    Profile,
    ProfileOwnerList,
}

interface IReduxProps {
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
    openListModal: (payload: OpenListModalPayload) => void
}
interface ICardPlaceWideProps extends IReduxProps, IWithAuthInjectedProps {
    place: IVenue
    type: CardPlaceWideEnum
    handleRemoveFromList?: (place: IVenue) => void
}

const CardPlaceWide: React.FC<ICardPlaceWideProps> = ({
    place,
    type,
    openRecommendationModal,
    openListModal,
    authenticatedAction,
    handleRemoveFromList,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [isMoreVisible, setMoreVisible] = React.useState(false)
    const [placeLink, setPlaceLink] = React.useState('')
    const windowSize = useWindowSize()
    const viewport: string =
        windowSize.width >= Number(size.laptop)
            ? deviceNames.laptop
            : windowSize.width >= Number(size.tablet)
            ? deviceNames.tablet
            : deviceNames.mobile

    React.useEffect(() => {
        if (window) {
            const link = `${window.location.origin}${R.ROUTE_ITEMS.restaurant}/${place.id}`
            setPlaceLink(link)
        }
    }, [place])

    const handleView = () => {
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
                                    message={<SnackbarMessageBody>{B.RESTAURANT_LINK_COPIED.Body}</SnackbarMessageBody>}
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

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        if (_.has(place, 'id') && handleRemoveFromList) {
            handleRemoveFromList(place)
        }
        e.stopPropagation()
    }

    const ViewMore = () => {
        return (
            <CardIcon onClick={handleMore}>
                {isMoreVisible ? (
                    <Image src={CloseSVG} alt="close-icon" />
                ) : (
                    <Image src={ExpandSVG} alt="ellipses-icon" />
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
                                {place && place.name
                                    ? viewport === deviceNames.laptop
                                        ? type === CardPlaceWideEnum.Search
                                            ? chopStringSearchPlaceNameLaptop(place.name)
                                            : chopStringPlaceNameLaptop(place.name)
                                        : viewport === deviceNames.tablet
                                        ? type === CardPlaceWideEnum.Search
                                            ? chopStringSearchPlaceNameTablet(place.name)
                                            : chopStringPlaceNameTablet(place.name)
                                        : viewport === deviceNames.mobile
                                        ? chopStringPlaceNameMobile(place.name)
                                        : chopStringPlaceNameLaptop(place.name)
                                    : null}
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
                                                    {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                        <RemoveFromListButton handleClick={handleRemove} />
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
                            {place && place.locality ? place.locality + ', ' : null}
                            {place && place.state ? place.state : null}
                        </WidePlaceAddressText>
                    )}
                    <CardPlaceWidePlaceCategoryText>
                        {place && place.categories
                            ? viewport === deviceNames.laptop
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceCategoriesLaptop(
                                          concatCategories(
                                              place.categories.map((category: ICategory) => category.longName)
                                          )
                                      )
                                    : chopStringPlaceCategoriesLaptop(
                                          concatCategories(
                                              place.categories.map((category: ICategory) => category.longName)
                                          )
                                      )
                                : viewport === deviceNames.tablet
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceCategoriesTablet(
                                          concatCategories(
                                              place.categories.map((category: ICategory) => category.longName)
                                          )
                                      )
                                    : chopStringPlaceCategoriesTablet(
                                          concatCategories(
                                              place.categories.map((category: ICategory) => category.longName)
                                          )
                                      )
                                : viewport === deviceNames.mobile
                                ? chopStringPlaceCategoriesMobile(
                                      concatCategories(place.categories.map((category: ICategory) => category.longName))
                                  )
                                : chopStringPlaceCategoriesLaptop(
                                      concatCategories(place.categories.map((category: ICategory) => category.longName))
                                  )
                            : null}
                    </CardPlaceWidePlaceCategoryText>
                </CardPlaceWideContentTopContainer>
                <CardPlaceWideContentMiddleContainer>
                    <CardPlaceWideTitleText>
                        {place && place.latestRecommendation && place.latestRecommendation.title
                            ? viewport === deviceNames.laptop
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceLatestRecommendationTitleLaptop(
                                          place.latestRecommendation.title
                                      )
                                    : chopStringPlaceLatestRecommendationTitleLaptop(place.latestRecommendation.title)
                                : viewport === deviceNames.tablet
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceLatestRecommendationTitleTablet(
                                          place.latestRecommendation.title
                                      )
                                    : chopStringPlaceLatestRecommendationTitleTablet(place.latestRecommendation.title)
                                : viewport === deviceNames.mobile
                                ? chopStringPlaceLatestRecommendationTitleMobile(place.latestRecommendation.title)
                                : chopStringPlaceLatestRecommendationTitleLaptop(place.latestRecommendation.title)
                            : null}
                    </CardPlaceWideTitleText>
                    <CardPlaceWideSummaryText>
                        {place && place.latestRecommendation && place.latestRecommendation.content
                            ? viewport === deviceNames.laptop
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceLatestRecommendationContentLaptop(
                                          place.latestRecommendation.content
                                      )
                                    : chopStringPlaceLatestRecommendationContentLaptop(
                                          place.latestRecommendation.content
                                      )
                                : viewport === deviceNames.tablet
                                ? type === CardPlaceWideEnum.Search
                                    ? chopStringSearchPlaceLatestRecommendationContentTablet(
                                          place.latestRecommendation.content
                                      )
                                    : chopStringPlaceLatestRecommendationContentTablet(
                                          place.latestRecommendation.content
                                      )
                                : viewport === deviceNames.mobile
                                ? chopStringPlaceLatestRecommendationContentMobile(place.latestRecommendation.content)
                                : chopStringPlaceLatestRecommendationContentLaptop(place.latestRecommendation.content)
                            : null}
                    </CardPlaceWideSummaryText>
                </CardPlaceWideContentMiddleContainer>
                <CardPlaceWideContentBottomContainer>
                    <CardPlaceWideAuthorNameText>
                        {place && place.latestRecommendation && place.latestRecommendation.createdBy
                            ? viewport === deviceNames.laptop
                                ? chopStringPlaceUserNameLaptop(
                                      `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`
                                  )
                                : viewport === deviceNames.tablet
                                ? chopStringPlaceUserNameTablet(
                                      `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`
                                  )
                                : viewport === deviceNames.mobile
                                ? chopStringPlaceUserNameMobile(
                                      `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`
                                  )
                                : chopStringPlaceUserNameLaptop(
                                      `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`
                                  )
                            : null}
                    </CardPlaceWideAuthorNameText>
                    <CardPlaceWideAuthorTitleText>
                        {place && place.latestRecommendation && place.latestRecommendation.createdBy
                            ? viewport === deviceNames.laptop
                                ? chopStringPlaceUserByLineLaptop(place.latestRecommendation.createdBy.userByLine)
                                : viewport === deviceNames.tablet
                                ? chopStringPlaceUserByLineTablet(place.latestRecommendation.createdBy.userByLine)
                                : viewport === deviceNames.mobile
                                ? chopStringPlaceUserByLineMobile(place.latestRecommendation.createdBy.userByLine)
                                : chopStringPlaceUserByLineLaptop(place.latestRecommendation.createdBy.userByLine)
                            : null}
                    </CardPlaceWideAuthorTitleText>
                    <Media queries={query} defaultMatches={{ mobile: true }}>
                        {(matches) =>
                            matches.mobile && (
                                <MobileButtonsContainer>
                                    {isMoreVisible ? (
                                        <MobileActionButtonsContainer>
                                            {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                <RemoveFromListButton handleClick={handleRemove} isMobile={true} />
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
