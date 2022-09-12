import { Tooltip } from '@material-ui/core'
import Grow from '@material-ui/core/Grow'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import ExpandSVG from 'assets/expand-icon.svg'
import PlaceHolderOne from 'assets/Image01.png'
import PlaceHolderTwo from 'assets/Image02.png'
import PlaceHolderThree from 'assets/Image03.png'
import PlaceHolderFour from 'assets/Image04.png'
import PlaceHolderFive from 'assets/Image05.png'
import PlaceHolderSix from 'assets/Image06.png'
import PlaceHolderSeven from 'assets/Image07.png'
import PlaceHolderEight from 'assets/Image08.png'
import PlaceHolderNine from 'assets/Image09.png'
import PlaceHolderTen from 'assets/Image10.png'
import PlaceHolderEleven from 'assets/Image11.png'
import PlaceHolderTwelve from 'assets/Image12.png'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import EditRecommendationButton from 'components/CardButtons/EditRecommendationButton'
import FlagButton from 'components/CardButtons/FlagButton'
import RemoveFromListButton from 'components/CardButtons/RemoveFromListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import CardRatings from 'components/CardRatings/CardRatings'
import Image from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openFlagModal } from 'store/flagModal/flagModal_actions'
import { OpenFlagModalPayload } from 'store/flagModal/flagModal_types'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
import { openRecommendationModal } from 'store/recommendationModal/recommendationModal_actions'
import {
    RecommendationModalPlaceInformation,
    RecommendationModalType,
} from 'store/recommendationModal/recommendationModal_types'
import {
    CardIcon,
    MobileActionButtonsContainer,
    MobileButtonsContainer,
    MoreHorizontalContainer,
    MoreVerticalContainer,
    WideHeaderContentContainer,
    WideHeaderTooltipIconsContainer,
} from 'style/Card/Card.style'
import { DeviceNameEnum, query, size } from 'style/device'
import {
    chopStringRecommendationCardAddress,
    chopStringRecommendationCardByLine,
    chopStringRecommendationCardCategories,
    chopStringRecommendationCardDescription,
    chopStringRecommendationCardPlaceName,
    chopStringRecommendationCardTitle,
    chopStringRecommendationCardUserName,
} from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import { getMomentFromNow } from 'utilities/helpers/getMomentFromNow'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { ICategory } from 'utilities/types/category'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IRecommendation } from 'utilities/types/recommendation'
import { IUserProfile } from 'utilities/types/userProfile'
import {
    RecommendationAnchor,
    RecommendationAuthorLineContainer,
    RecommendationAuthorNameText,
    RecommendationAuthorTitleText,
    RecommendationButtonsContainer,
    RecommendationCardContainer,
    RecommendationCardContentContainer,
    RecommendationCardImage,
    RecommendationCardImageContainer,
    RecommendationContentBottomContainer,
    RecommendationContentMiddleContainer,
    RecommendationContentTopContainer,
    RecommendationHeaderContainer,
    RecommendationPlaceAddressText,
    RecommendationPlaceCategoryText,
    RecommendationPlaceNameText,
    RecommendationSummaryText,
    RecommendationTimestampText,
    RecommendationTitleText,
} from './CardRecommendationWide.style'

export enum CardRecommendationWideEnum {
    RecommendationList,
    Restaurant,
    Profile,
    Home,
    City,
    AdminFlagged,
}

interface IReduxProps {
    user: IUserProfile
    userRole: UserRoleEnum
    openRecommendationModal: (placeInformation: RecommendationModalPlaceInformation) => void
    openListModal: (payload: OpenListModalPayload) => void
    openFlagModal: (payload: OpenFlagModalPayload) => void
    venuesInLists: number[]
    venuesRecommended: number[]
    isPrelaunch: boolean
}

interface IRecommendationCardProps extends IReduxProps, IWithAuthInjectedProps {
    isHighlighted?: boolean
    isFull: boolean
    recommendation: IRecommendation
    handleRemoveFromList?: () => void
    type?: CardRecommendationWideEnum
}

const CardRecommendationWide: React.FC<IRecommendationCardProps> = ({
    isHighlighted,
    isFull,
    recommendation,
    authenticatedAction,
    user,
    userRole,
    openRecommendationModal,
    openListModal,
    openFlagModal,
    handleRemoveFromList,
    type,
    venuesInLists,
    venuesRecommended,
    isPrelaunch,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const [currentRecommendation, setCurrentRecommendation] = React.useState<IRecommendation | null>(null)
    const [currentRandomImge, setCurrentRandomImage] = React.useState('')
    const [isLoading, setLoading] = React.useState(false)
    const [isMoreVisible, setMoreVisible] = React.useState(
        type === CardRecommendationWideEnum.AdminFlagged ? true : false
    )

    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    React.useEffect(() => {
        const randomNumber = Math.floor(Math.random() * 12)
        if (randomNumber == 0) {
            setCurrentRandomImage(PlaceHolderOne)
        } else if (randomNumber == 1) {
            setCurrentRandomImage(PlaceHolderTwo)
        } else if (randomNumber == 2) {
            setCurrentRandomImage(PlaceHolderThree)
        } else if (randomNumber == 3) {
            setCurrentRandomImage(PlaceHolderFour)
        } else if (randomNumber == 4) {
            setCurrentRandomImage(PlaceHolderFive)
        } else if (randomNumber == 5) {
            setCurrentRandomImage(PlaceHolderSix)
        } else if (randomNumber == 6) {
            setCurrentRandomImage(PlaceHolderSeven)
        } else if (randomNumber == 7) {
            setCurrentRandomImage(PlaceHolderEight)
        } else if (randomNumber == 8) {
            setCurrentRandomImage(PlaceHolderNine)
        } else if (randomNumber == 9) {
            setCurrentRandomImage(PlaceHolderTen)
        } else if (randomNumber == 10) {
            setCurrentRandomImage(PlaceHolderEleven)
        } else if (randomNumber == 11) {
            setCurrentRandomImage(PlaceHolderTwelve)
        }
    }, [])

    React.useEffect(() => {
        setCurrentRecommendation(recommendation)
        // setLoading(true)
        // if (_.has(recommendation, 'id')) {
        //     axios
        //         .get(FETCH_RECOMMENDATION(recommendation.id))
        //         .then((res) => {
        //             setCurrentRecommendation(res.data)
        //         })
        //         .catch((err) => console.log(err))
        //         .finally(() => {
        //             setLoading(false)
        //         })
        // }
    }, [recommendation])

    const handleFlag = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation && currentRecommendation.id !== undefined && currentRecommendation.id !== null) {
            authenticatedAction(() =>
                openFlagModal({
                    recommendationID: currentRecommendation.id,
                })
            )
        }
        e.stopPropagation()
        setMoreVisible(false)
    }

    const handleAddToList = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation) {
            if (userRole === UserRoleEnum.Admin) {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.AddToRecommendationList,
                    recommendationID: currentRecommendation.id,
                    recommendationTitle: currentRecommendation.title,
                }
                openListModal(openListModalPayload)
            } else if (userRole === UserRoleEnum.User && currentRecommendation.venue) {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.AddToRestaurantList,
                    placeID: currentRecommendation.venue.id,
                }
                openListModal(openListModalPayload)
            }
        }
        e.stopPropagation()
        setMoreVisible(false)
    }

    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        if (
            currentRecommendation &&
            currentRecommendation.id !== undefined &&
            currentRecommendation.id !== null &&
            currentRecommendation.venue &&
            currentRecommendation.venue.name
        ) {
            authenticatedAction(() =>
                openRecommendationModal({
                    placeID: String(currentRecommendation.venue.id),
                    placeName: currentRecommendation.venue.name,
                    recommendation_type: RecommendationModalType.AATL,
                })
            )
        }
        e.stopPropagation()
        setMoreVisible(false)
    }

    const handleEditRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        if (
            currentRecommendation &&
            currentRecommendation.id !== undefined &&
            currentRecommendation.id !== null &&
            currentRecommendation.venue &&
            currentRecommendation.venue.name
        ) {
            authenticatedAction(() =>
                openRecommendationModal({
                    placeID: String(currentRecommendation.venue.id),
                    placeName: currentRecommendation.venue.name,
                    recommendation_type: RecommendationModalType.Edit,
                    recommendationID: currentRecommendation.id,
                })
            )
        }
        e.stopPropagation()
        setMoreVisible(false)
    }

    const handleShare = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation) {
            navigator.clipboard
                .writeText(
                    `${window.location.origin}${R.ROUTE_ITEMS.restaurant}/${currentRecommendation.venue.id}?r=${currentRecommendation.id}`
                )
                .then(() => {
                    enqueueSnackbar('', {
                        content: (
                            <div>
                                <Snackbar
                                    type={B.RECOMMENDATION_LINK_COPIED.Type}
                                    title={B.RECOMMENDATION_LINK_COPIED.Title}
                                    message={
                                        <SnackbarMessageBody>{B.RECOMMENDATION_LINK_COPIED.Body}</SnackbarMessageBody>
                                    }
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
        setMoreVisible(false)
    }

    const handleDelete = (e: React.MouseEvent<HTMLElement>) => {
        if (currentRecommendation && handleRemoveFromList) {
            handleRemoveFromList()
        }
        e.stopPropagation()
        setMoreVisible(false)
    }

    const handleMore = (e: React.MouseEvent<HTMLElement>) => {
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
    }

    const handlePreLaunchClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        enqueueSnackbar('', {
            content: (
                <div>
                    <Snackbar
                        type={B.SNACKBAR_TYPES.Complete}
                        title={B.PRELAUNCH_MESSAGE.Title}
                        message={<SnackbarMessageBody>{B.PRELAUNCH_MESSAGE.Body}</SnackbarMessageBody>}
                    />
                </div>
            ),
        })
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
        <Grow in={true}>
            <RecommendationCardContainer id={isMoreVisible ? 'toggled' : 'not-toggled'} key={recommendation?.id}>
                <RecommendationCardImageContainer
                    src={
                        recommendation
                            ? recommendation.imageCDNUrl
                                ? recommendation.imageCDNUrl
                                : currentRandomImge
                            : ''
                    }
                    isToggled={isMoreVisible}
                >
                    <RecommendationCardImage
                        src={
                            recommendation
                                ? recommendation.imageCDNUrl
                                    ? recommendation.imageCDNUrl
                                    : currentRandomImge
                                : ''
                        }
                        alt="recommendation-image"
                        isToggled={isMoreVisible}
                    />
                </RecommendationCardImageContainer>
                <RecommendationCardContentContainer isHighlighted={isHighlighted} isToggled={isMoreVisible}>
                    <RecommendationContentTopContainer>
                        <RecommendationHeaderContainer>
                            <WideHeaderContentContainer>
                                {type !== CardRecommendationWideEnum.Restaurant ? (
                                    currentRecommendation &&
                                    currentRecommendation.venue &&
                                    currentRecommendation.venue.name ? (
                                        isPrelaunch ? (
                                            <RecommendationAnchor onClick={handlePreLaunchClick}>
                                                <RecommendationPlaceNameText>
                                                    {isMoreVisible
                                                        ? currentRecommendation.venue.name
                                                        : chopStringRecommendationCardPlaceName(
                                                              currentRecommendation.venue.name,
                                                              viewport,
                                                              isFull
                                                          )}
                                                </RecommendationPlaceNameText>
                                            </RecommendationAnchor>
                                        ) : (
                                            <Link
                                                href={`${R.ROUTE_ITEMS.restaurant}/${currentRecommendation.venue.id}`}
                                                passHref={true}
                                                prefetch={false}
                                            >
                                                <RecommendationAnchor
                                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                                                >
                                                    <RecommendationPlaceNameText>
                                                        {isMoreVisible
                                                            ? currentRecommendation.venue.name
                                                            : chopStringRecommendationCardPlaceName(
                                                                  currentRecommendation.venue.name,
                                                                  viewport,
                                                                  isFull
                                                              )}
                                                    </RecommendationPlaceNameText>
                                                </RecommendationAnchor>
                                            </Link>
                                        )
                                    ) : (
                                        ''
                                    )
                                ) : isMoreVisible ? (
                                    currentRecommendation && currentRecommendation.title ? (
                                        <RecommendationPlaceNameText>
                                            {currentRecommendation.title}
                                        </RecommendationPlaceNameText>
                                    ) : (
                                        ''
                                    )
                                ) : currentRecommendation && currentRecommendation.title ? (
                                    <RecommendationPlaceNameText>
                                        {chopStringRecommendationCardPlaceName(
                                            currentRecommendation.title,
                                            viewport,
                                            isFull
                                        )}
                                    </RecommendationPlaceNameText>
                                ) : (
                                    ''
                                )}
                                <WideHeaderTooltipIconsContainer>
                                    {type !== CardRecommendationWideEnum.AdminFlagged &&
                                        currentRecommendation &&
                                        currentRecommendation.venue &&
                                        currentRecommendation.venue.id !== undefined &&
                                        currentRecommendation.venue.id !== null &&
                                        venuesRecommended &&
                                        venuesRecommended.includes(currentRecommendation.venue.id) && (
                                            <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                                <img src={AuthoredSVG} />
                                            </Tooltip>
                                        )}
                                    {type !== CardRecommendationWideEnum.AdminFlagged &&
                                        currentRecommendation &&
                                        currentRecommendation.venue &&
                                        currentRecommendation.venue.id !== undefined &&
                                        currentRecommendation.venue.id !== null &&
                                        venuesInLists &&
                                        venuesInLists.includes(currentRecommendation.venue.id) && (
                                            <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                                <img src={AddedSVG} alt="added-icon" />
                                            </Tooltip>
                                        )}
                                </WideHeaderTooltipIconsContainer>
                            </WideHeaderContentContainer>
                            <Media queries={query} defaultMatches={{ mobile: true }}>
                                {(matches) => (
                                    <>
                                        {type !== CardRecommendationWideEnum.AdminFlagged &&
                                            (matches.laptop || matches.tablet) && (
                                                <RecommendationButtonsContainer>
                                                    {isMoreVisible ? (
                                                        <MoreHorizontalContainer>
                                                            <FlagButton handleClick={handleFlag} />
                                                            {type === CardRecommendationWideEnum.RecommendationList &&
                                                            userRole === UserRoleEnum.Admin ? (
                                                                <RemoveFromListButton
                                                                    handleClick={(e: React.MouseEvent<HTMLElement>) =>
                                                                        authenticatedAction(() => handleDelete(e))
                                                                    }
                                                                />
                                                            ) : (
                                                                <AddToListButton
                                                                    handleClick={(e: React.MouseEvent<HTMLElement>) =>
                                                                        authenticatedAction(() => handleAddToList(e))
                                                                    }
                                                                />
                                                            )}
                                                            <WriteRecommendationButton
                                                                handleClick={handleWriteRecommendation}
                                                            />
                                                            {(user?.id === recommendation?.createdBy?.id ||
                                                                userRole === UserRoleEnum.Admin) && (
                                                                <EditRecommendationButton
                                                                    handleClick={handleEditRecommendation}
                                                                />
                                                            )}
                                                        </MoreHorizontalContainer>
                                                    ) : null}
                                                    {isMoreVisible ? (
                                                        <MoreVerticalContainer>
                                                            <ShareButton
                                                                handleClick={handleShare}
                                                                isRestaurant={false}
                                                            />
                                                        </MoreVerticalContainer>
                                                    ) : null}
                                                    <ViewMore />
                                                </RecommendationButtonsContainer>
                                            )}
                                    </>
                                )}
                            </Media>
                        </RecommendationHeaderContainer>
                        <CardRatings
                            rating={currentRecommendation.rating}
                            uniqueID={currentRecommendation ? currentRecommendation.id : 0}
                            isAvg={false}
                        />
                        {type !== CardRecommendationWideEnum.Restaurant && (
                            <>
                                <Media queries={query} defaultMatches={{ mobile: true }}>
                                    {(matches) => (
                                        <>
                                            {(matches.laptop || matches.tablet) && (
                                                <RecommendationPlaceAddressText>
                                                    {isMoreVisible
                                                        ? `${
                                                              currentRecommendation?.venue?.street
                                                                  ? currentRecommendation?.venue?.street
                                                                  : ''
                                                          }${
                                                              currentRecommendation?.venue?.locality
                                                                  ? ` ${currentRecommendation?.venue?.locality}, `
                                                                  : null
                                                          }${
                                                              currentRecommendation?.venue?.state
                                                                  ? currentRecommendation?.venue?.state
                                                                  : ''
                                                          }${
                                                              currentRecommendation?.venue?.postalCode
                                                                  ? ` ${currentRecommendation?.venue?.postalCode}`
                                                                  : null
                                                          }`
                                                        : chopStringRecommendationCardAddress(
                                                              `${
                                                                  currentRecommendation?.venue?.street
                                                                      ? currentRecommendation?.venue?.street
                                                                      : ''
                                                              }${
                                                                  currentRecommendation?.venue?.locality
                                                                      ? ` ${currentRecommendation?.venue?.locality}, `
                                                                      : null
                                                              }${
                                                                  currentRecommendation?.venue?.state
                                                                      ? currentRecommendation?.venue?.state
                                                                      : ''
                                                              }${
                                                                  currentRecommendation?.venue?.postalCode
                                                                      ? ` ${currentRecommendation?.venue?.postalCode}`
                                                                      : null
                                                              }`,
                                                              viewport,
                                                              isFull
                                                          )}
                                                </RecommendationPlaceAddressText>
                                            )}
                                        </>
                                    )}
                                </Media>
                                <RecommendationPlaceCategoryText>
                                    {currentRecommendation &&
                                    currentRecommendation.venue &&
                                    currentRecommendation.venue.categories
                                        ? isMoreVisible
                                            ? concatCategories(
                                                  currentRecommendation.venue.categories.map((category: ICategory) => {
                                                      return category.longName
                                                  })
                                              )
                                            : chopStringRecommendationCardCategories(
                                                  concatCategories(
                                                      currentRecommendation.venue.categories.map(
                                                          (category: ICategory) => {
                                                              return category.longName
                                                          }
                                                      )
                                                  ),
                                                  viewport,
                                                  isFull
                                              )
                                        : ''}
                                </RecommendationPlaceCategoryText>
                            </>
                        )}
                    </RecommendationContentTopContainer>
                    <RecommendationContentMiddleContainer>
                        {type !== CardRecommendationWideEnum.Restaurant && (
                            <RecommendationTitleText>
                                {isMoreVisible
                                    ? currentRecommendation.title
                                    : chopStringRecommendationCardTitle(currentRecommendation.title, viewport, isFull)}
                            </RecommendationTitleText>
                        )}
                        <RecommendationSummaryText>
                            {isMoreVisible
                                ? currentRecommendation && currentRecommendation.content
                                    ? currentRecommendation.content
                                    : ''
                                : currentRecommendation && currentRecommendation.content
                                ? chopStringRecommendationCardDescription(currentRecommendation.content, viewport, type)
                                : ''}
                        </RecommendationSummaryText>
                    </RecommendationContentMiddleContainer>
                    <RecommendationContentBottomContainer>
                        {/* TODO: Replace ID below with UserName once username becomes unique */}
                        <RecommendationAuthorLineContainer>
                            <Link
                                href={`${R.ROUTE_ITEMS.userProfile}/${currentRecommendation.createdBy.id}`}
                                passHref={true}
                                prefetch={false}
                            >
                                <RecommendationAnchor
                                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
                                >
                                    <RecommendationAuthorNameText>
                                        {_.has(currentRecommendation, 'createdBy.firstName') &&
                                        _.has(currentRecommendation, 'createdBy.lastName')
                                            ? isMoreVisible
                                                ? currentRecommendation.createdBy.firstName +
                                                  ' ' +
                                                  currentRecommendation.createdBy.lastName
                                                : chopStringRecommendationCardUserName(
                                                      `${
                                                          currentRecommendation.createdBy.firstName +
                                                          ' ' +
                                                          currentRecommendation.createdBy.lastName +
                                                          ' '
                                                      }`,
                                                      viewport,
                                                      isFull
                                                  )
                                            : ''}
                                    </RecommendationAuthorNameText>
                                </RecommendationAnchor>
                            </Link>
                            <RecommendationTimestampText>
                                {currentRecommendation.updatedAt == currentRecommendation.createdAt
                                    ? ' ' + ` • ${getMomentFromNow(currentRecommendation.createdAt)}`
                                    : ' ' + ` • Updated ${getMomentFromNow(currentRecommendation.updatedAt)}`}
                            </RecommendationTimestampText>
                        </RecommendationAuthorLineContainer>
                        <RecommendationAuthorTitleText>
                            {_.has(currentRecommendation, 'createdBy.userByLine')
                                ? isMoreVisible
                                    ? currentRecommendation.createdBy.userByLine
                                    : chopStringRecommendationCardByLine(
                                          currentRecommendation.createdBy.userByLine,
                                          viewport,
                                          isFull
                                      )
                                : ''}
                        </RecommendationAuthorTitleText>
                        <Media queries={query} defaultMatches={{ mobile: true }}>
                            {(matches) =>
                                type !== CardRecommendationWideEnum.AdminFlagged &&
                                matches.mobile && (
                                    <MobileButtonsContainer>
                                        {isMoreVisible ? (
                                            <MobileActionButtonsContainer>
                                                {type === CardRecommendationWideEnum.RecommendationList &&
                                                userRole === UserRoleEnum.Admin ? (
                                                    <RemoveFromListButton
                                                        handleClick={(e: React.MouseEvent<HTMLElement>) =>
                                                            authenticatedAction(() => handleDelete(e))
                                                        }
                                                        isMobile={true}
                                                    />
                                                ) : (
                                                    <AddToListButton
                                                        handleClick={(e: React.MouseEvent<HTMLElement>) =>
                                                            authenticatedAction(() => handleAddToList(e))
                                                        }
                                                        isMobile={true}
                                                    />
                                                )}
                                                <WriteRecommendationButton
                                                    handleClick={handleWriteRecommendation}
                                                    isMobile={true}
                                                />
                                                {(user?.id === recommendation?.createdBy?.id ||
                                                    userRole === UserRoleEnum.Admin) && (
                                                    <EditRecommendationButton
                                                        handleClick={handleEditRecommendation}
                                                        isMobile={true}
                                                    />
                                                )}
                                                <ShareButton
                                                    handleClick={handleShare}
                                                    isMobile={true}
                                                    isRestaurant={false}
                                                />
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
        </Grow>
    ) : null
}

const mapStateToProps = (state: StoreState) => ({
    userRole: state.userReducer.userRole,
    venuesInLists: state.userReducer.venuesListsVenueIDs,
    venuesRecommended: state.userReducer.venuesRecommendedVenueIDs,
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
    user: state.userReducer.user,
})

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators({ openRecommendationModal, openListModal, openFlagModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(CardRecommendationWide))
