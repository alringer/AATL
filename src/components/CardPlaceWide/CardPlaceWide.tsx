import Grow from '@material-ui/core/Grow'
import Tooltip from '@material-ui/core/Tooltip'
import AddedSVG from 'assets/added.svg'
import AuthoredSVG from 'assets/authored.svg'
import ExpandSVG from 'assets/expand-icon.svg'
import CloseSVG from 'assets/mushroomOutlineClose.svg'
import AddToListButton from 'components/CardButtons/AddToListButton'
import RemoveFromListButton from 'components/CardButtons/RemoveFromListButton'
import ShareButton from 'components/CardButtons/ShareButton'
import WriteRecommendationButton from 'components/CardButtons/WriteRecommendationButton'
import CardRatings from 'components/CardRatings/CardRatings'
import { default as Image } from 'components/Image/Image'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import _ from 'lodash'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import Media from 'react-media'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
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
    WideHeaderContentContainer,
    WideHeaderTooltipIconsContainer,
    WidePlaceAddressText,
} from 'style/Card/Card.style'
import { DeviceNameEnum, query, size } from 'style/device'
import {
    chopStringPlaceCategories,
    chopStringPlaceLatestRecommendationContent,
    chopStringPlaceLatestRecommendationTitle,
    chopStringPlaceName,
    chopStringPlaceUserByLine,
    chopStringPlaceUserName,
} from 'utilities/helpers/chopString'
import { concatCategories } from 'utilities/helpers/concatStrings'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import useWindowSize from 'utilities/hooks/useWindowSize'
import { ICategory } from 'utilities/types/category'
import { IVenue } from 'utilities/types/venue'
import {
    CardPlaceWideAnchor,
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
    venuesInLists: number[]
    venuesRecommended: number[]
    isPrelaunch: boolean
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
    venuesInLists,
    venuesRecommended,
    isPrelaunch,
}) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const [currentPlace, setCurrentPlace] = React.useState(null)
    const [isMoreVisible, setMoreVisible] = React.useState(false)
    const [placeLink, setPlaceLink] = React.useState('')
    const windowSize = useWindowSize()
    const viewport: DeviceNameEnum =
        windowSize.width >= Number(size.laptop)
            ? DeviceNameEnum.laptop
            : windowSize.width >= Number(size.tablet)
            ? DeviceNameEnum.tablet
            : DeviceNameEnum.mobile

    React.useEffect(() => {
        if (window) {
            const link = `${window.location.origin}${R.ROUTE_ITEMS.restaurant}/${place.id}`
            setPlaceLink(link)
        }
        setCurrentPlace(place)
    }, [place])

    const handleWriteRecommendation = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
        if (_.has(place, 'id') && _.has(place, 'name')) {
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
        e.preventDefault()
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
        e.preventDefault()
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
        e.preventDefault()
        setMoreVisible(!isMoreVisible)
        e.stopPropagation()
    }

    const handleRemove = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault()
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

    const handlePrelaunchClick = (e: React.MouseEvent<HTMLElement>) => {
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

    return isPrelaunch
        ? currentPlace && (
              <CardPlaceWideAnchor onClick={handlePrelaunchClick}>
                  <Grow in={true}>
                      <CardPlaceWideCardContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                          <CardPlaceWideCardImageContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                              <Image src={place ? place.imageCDNUrl : null} alt="recommendation-image" />
                          </CardPlaceWideCardImageContainer>
                          <CardPlaceWideCardContentContainer>
                              <CardPlaceWideContentTopContainer>
                                  <CardPlaceWideHeaderContainer>
                                      <WideHeaderContentContainer>
                                          <CardPlaceWidePlaceNameText>
                                              {place && place.name
                                                  ? chopStringPlaceName(place.name, viewport, type)
                                                  : null}
                                          </CardPlaceWidePlaceNameText>
                                          <WideHeaderTooltipIconsContainer>
                                              {place &&
                                                  place.id !== undefined &&
                                                  place.id !== null &&
                                                  venuesRecommended &&
                                                  venuesRecommended.includes(Number(place.id)) && (
                                                      <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                                          <img src={AuthoredSVG} />
                                                      </Tooltip>
                                                  )}
                                              {place &&
                                                  place.id !== undefined &&
                                                  place.id !== null &&
                                                  venuesInLists &&
                                                  venuesInLists.includes(Number(place.id)) && (
                                                      <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                                          <img src={AddedSVG} alt="added-icon" />
                                                      </Tooltip>
                                                  )}
                                          </WideHeaderTooltipIconsContainer>
                                      </WideHeaderContentContainer>
                                      <Media queries={query} defaultMatches={{ mobile: true }}>
                                          {(matches) => (
                                              <>
                                                  {(matches.laptop || matches.tablet) && (
                                                      <CardPlaceWideButtonsContainer>
                                                          {isMoreVisible ? (
                                                              <MoreHorizontalContainer>
                                                                  {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                                      <RemoveFromListButton
                                                                          handleClick={handleRemove}
                                                                      />
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
                                                                  <ShareButton
                                                                      handleClick={handleShare}
                                                                      isRestaurant={true}
                                                                  />
                                                              </MoreVerticalContainer>
                                                          ) : null}
                                                          <ViewMore />
                                                      </CardPlaceWideButtonsContainer>
                                                  )}
                                              </>
                                          )}
                                      </Media>
                                  </CardPlaceWideHeaderContainer>
                                  {(type === CardPlaceWideEnum.Search ||
                                      type === CardPlaceWideEnum.Profile ||
                                      type === CardPlaceWideEnum.ProfileOwnerList) && (
                                      <WidePlaceAddressText>
                                          {place && place.street ? place.street : null}
                                          {place && place.locality ? place.locality + ', ' : null}
                                          {place && place.state ? place.state : null}
                                      </WidePlaceAddressText>
                                  )}
                                  <CardPlaceWidePlaceCategoryText>
                                      {place && place.categories
                                          ? chopStringPlaceCategories(
                                                concatCategories(
                                                    place.categories.map((category: ICategory) => category.longName)
                                                ),
                                                viewport,
                                                type
                                            )
                                          : null}
                                  </CardPlaceWidePlaceCategoryText>
                              </CardPlaceWideContentTopContainer>
                              <CardPlaceWideContentMiddleContainer>
                                  <CardPlaceWideTitleText>
                                      {place && place.latestRecommendation && place.latestRecommendation.title
                                          ? chopStringPlaceLatestRecommendationTitle(
                                                place.latestRecommendation.title,
                                                viewport,
                                                type
                                            )
                                          : null}
                                  </CardPlaceWideTitleText>
                                  <CardPlaceWideSummaryText>
                                      {place && place.latestRecommendation && place.latestRecommendation.content
                                          ? chopStringPlaceLatestRecommendationContent(
                                                place.latestRecommendation.content,
                                                viewport,
                                                type
                                            )
                                          : null}
                                  </CardPlaceWideSummaryText>
                              </CardPlaceWideContentMiddleContainer>
                              <CardPlaceWideContentBottomContainer>
                                  <CardPlaceWideAuthorNameText>
                                      {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                          ? chopStringPlaceUserName(
                                                `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`,
                                                viewport,
                                                type
                                            )
                                          : null}
                                  </CardPlaceWideAuthorNameText>
                                  <CardPlaceWideAuthorTitleText>
                                      {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                          ? chopStringPlaceUserByLine(
                                                place.latestRecommendation.createdBy.userByLine,
                                                viewport,
                                                type
                                            )
                                          : null}
                                  </CardPlaceWideAuthorTitleText>
                                  <Media queries={query} defaultMatches={{ mobile: true }}>
                                      {(matches) =>
                                          matches.mobile && (
                                              <MobileButtonsContainer>
                                                  {isMoreVisible ? (
                                                      <MobileActionButtonsContainer>
                                                          {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                              <RemoveFromListButton
                                                                  handleClick={handleRemove}
                                                                  isMobile={true}
                                                              />
                                                          ) : (
                                                              <AddToListButton
                                                                  handleClick={handleAddToList}
                                                                  isMobile={true}
                                                              />
                                                          )}
                                                          <WriteRecommendationButton
                                                              handleClick={handleWriteRecommendation}
                                                              isMobile={true}
                                                          />
                                                          <ShareButton
                                                              handleClick={handleShare}
                                                              isMobile={true}
                                                              isRestaurant={true}
                                                          />
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
                  </Grow>
              </CardPlaceWideAnchor>
          )
        : currentPlace && (
              <Link href={`${R.ROUTE_ITEMS.restaurant}/${place.id}`} passHref={true} prefetch={false}>
                  <CardPlaceWideAnchor>
                      <Grow in={true}>
                          <CardPlaceWideCardContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                              <CardPlaceWideCardImageContainer id={type === CardPlaceWideEnum.Search ? 'search' : ''}>
                                  <Image src={place ? place.imageCDNUrl : null} alt="recommendation-image" />
                              </CardPlaceWideCardImageContainer>
                              <CardPlaceWideCardContentContainer>
                                  <CardPlaceWideContentTopContainer>
                                      <CardPlaceWideHeaderContainer>
                                          <WideHeaderContentContainer>
                                              <CardPlaceWidePlaceNameText>
                                                  {place && place.name
                                                      ? chopStringPlaceName(place.name, viewport, type)
                                                      : null}
                                              </CardPlaceWidePlaceNameText>
                                              <WideHeaderTooltipIconsContainer>
                                                  {place &&
                                                      place.id !== undefined &&
                                                      place.id !== null &&
                                                      venuesRecommended &&
                                                      venuesRecommended.includes(Number(place.id)) && (
                                                          <Tooltip title={S.TOOL_TIPS.Recommended} placement="top">
                                                              <img src={AuthoredSVG} />
                                                          </Tooltip>
                                                      )}
                                                  {place &&
                                                      place.id !== undefined &&
                                                      place.id !== null &&
                                                      venuesInLists &&
                                                      venuesInLists.includes(Number(place.id)) && (
                                                          <Tooltip title={S.TOOL_TIPS.Added} placement="top">
                                                              <img src={AddedSVG} alt="added-icon" />
                                                          </Tooltip>
                                                      )}
                                              </WideHeaderTooltipIconsContainer>
                                          </WideHeaderContentContainer>
                                          <Media queries={query} defaultMatches={{ mobile: true }}>
                                              {(matches) => (
                                                  <>
                                                      {(matches.laptop || matches.tablet) && (
                                                          <CardPlaceWideButtonsContainer>
                                                              {isMoreVisible ? (
                                                                  <MoreHorizontalContainer>
                                                                      {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                                          <RemoveFromListButton
                                                                              handleClick={handleRemove}
                                                                          />
                                                                      ) : (
                                                                          <AddToListButton
                                                                              handleClick={handleAddToList}
                                                                          />
                                                                      )}
                                                                      <WriteRecommendationButton
                                                                          handleClick={handleWriteRecommendation}
                                                                      />
                                                                  </MoreHorizontalContainer>
                                                              ) : null}
                                                              {isMoreVisible ? (
                                                                  <MoreVerticalContainer>
                                                                      <ShareButton
                                                                          handleClick={handleShare}
                                                                          isRestaurant={true}
                                                                      />
                                                                  </MoreVerticalContainer>
                                                              ) : null}
                                                              <ViewMore />
                                                          </CardPlaceWideButtonsContainer>
                                                      )}
                                                  </>
                                              )}
                                          </Media>
                                      </CardPlaceWideHeaderContainer>
                                      <CardRatings
                                          rating={place ? place.averageRating : 0}
                                          uniqueID={place ? place.id : 0}
                                          isAvg={true}
                                      />
                                      {(type === CardPlaceWideEnum.Search ||
                                          type === CardPlaceWideEnum.Profile ||
                                          type === CardPlaceWideEnum.ProfileOwnerList) && (
                                          <WidePlaceAddressText>
                                              {place && place.street ? place.street : null}
                                              {place && place.locality ? place.locality + ', ' : null}
                                              {place && place.state ? place.state : null}
                                          </WidePlaceAddressText>
                                      )}
                                      <CardPlaceWidePlaceCategoryText>
                                          {place && place.categories
                                              ? chopStringPlaceCategories(
                                                    concatCategories(
                                                        place.categories.map((category: ICategory) => category.longName)
                                                    ),
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWidePlaceCategoryText>
                                  </CardPlaceWideContentTopContainer>
                                  <CardPlaceWideContentMiddleContainer>
                                      <CardPlaceWideTitleText>
                                          {place && place.latestRecommendation && place.latestRecommendation.title
                                              ? chopStringPlaceLatestRecommendationTitle(
                                                    place.latestRecommendation.title,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideTitleText>
                                      <CardPlaceWideSummaryText>
                                          {place && place.latestRecommendation && place.latestRecommendation.content
                                              ? chopStringPlaceLatestRecommendationContent(
                                                    place.latestRecommendation.content,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideSummaryText>
                                  </CardPlaceWideContentMiddleContainer>
                                  <CardPlaceWideContentBottomContainer>
                                      <CardPlaceWideAuthorNameText>
                                          {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                              ? chopStringPlaceUserName(
                                                    `${place.latestRecommendation.createdBy.firstName} ${place.latestRecommendation.createdBy.lastName}`,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideAuthorNameText>
                                      <CardPlaceWideAuthorTitleText>
                                          {place && place.latestRecommendation && place.latestRecommendation.createdBy
                                              ? chopStringPlaceUserByLine(
                                                    place.latestRecommendation.createdBy.userByLine,
                                                    viewport,
                                                    type
                                                )
                                              : null}
                                      </CardPlaceWideAuthorTitleText>
                                      <Media queries={query} defaultMatches={{ mobile: true }}>
                                          {(matches) =>
                                              matches.mobile && (
                                                  <MobileButtonsContainer>
                                                      {isMoreVisible ? (
                                                          <MobileActionButtonsContainer>
                                                              {type === CardPlaceWideEnum.ProfileOwnerList ? (
                                                                  <RemoveFromListButton
                                                                      handleClick={handleRemove}
                                                                      isMobile={true}
                                                                  />
                                                              ) : (
                                                                  <AddToListButton
                                                                      handleClick={handleAddToList}
                                                                      isMobile={true}
                                                                  />
                                                              )}
                                                              <WriteRecommendationButton
                                                                  handleClick={handleWriteRecommendation}
                                                                  isMobile={true}
                                                              />
                                                              <ShareButton
                                                                  handleClick={handleShare}
                                                                  isMobile={true}
                                                                  isRestaurant={true}
                                                              />
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
                      </Grow>
                  </CardPlaceWideAnchor>
              </Link>
          )
}

const mapStateToProps = (state: StoreState) => ({
    venuesInLists: state.userReducer.venuesListsVenueIDs,
    venuesRecommended: state.userReducer.venuesRecommendedVenueIDs,
    isPrelaunch: state.prelaunchReducer.isPrelaunch,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openRecommendationModal, openListModal }, dispatch)

export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(CardPlaceWide))
