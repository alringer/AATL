import { Tooltip } from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody, SnackbarOrangeMessage } from 'components/Snackbar/Snackbar.style'
import axios, {
    DELETE_VENUE_FROM_LIST,
    FETCH_VENUES_IN_VENUE_LIST_META,
    FETCH_VENUE_LIST_METAS_BY_ID,
} from 'config/AxiosConfig'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import * as S from 'constants/StringConstants'
import { useSnackbar } from 'notistack'
import parse from 'parse-link-header'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RecommendationCardContainer } from 'sections/CardsList/List.style'
import { StoreState } from 'store'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenue } from 'utilities/types/venue'
import { IVenueListMeta, IVenueListMetaWithUniqueID } from 'utilities/types/venueListMeta'
import {
    UserProfileListsMainViewControlsContainer,
    UserProfileListsMainViewHeaderContainer,
    UserProfileListsMainViewHeaderTextContainer,
    UserProfileListsMainViewListDescription,
    UserProfileListsMainViewListTitle,
} from '../UserProfileLists.style'
import {
    CallMadeIcon,
    DeleteForeverIcon,
    EditIcon,
    ListControlButton,
    PaginationViewsListContainer,
} from './PaginationViews.style'

interface IReduxProps {
    openListModal: (payload: OpenListModalPayload) => void
}
interface IMyListPaginationViewProps extends IWithAuthInjectedProps, IReduxProps {
    inputMyList: IVenueListMetaWithUniqueID
    user: IUserProfile
    isOwner: boolean
    fetchVenueLists: () => void
}

const MyListPaginationView: React.FC<IMyListPaginationViewProps> = ({
    authenticatedAction,
    inputMyList,
    isOwner,
    openListModal,
    user,
    fetchVenueLists,
    getTokenConfig,
}) => {
    const { enqueueSnackbar } = useSnackbar()

    const [currentMyList, setCurrentMyList] = React.useState<IVenueListMetaWithUniqueID | null>(null)
    const [currentVenues, setCurrentVenues] = React.useState<IVenue[]>([])
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)

    React.useEffect(() => {
        if (inputMyList && inputMyList.id) {
            setCurrentMyList(inputMyList)
            fetchVenues(inputMyList.id, 0)
        }
    }, [inputMyList])

    React.useEffect(() => {
        console.log('current vnues:', currentVenues)
    }, [currentVenues])

    const fetchMyList = (id: number) => {
        axios
            .get(FETCH_VENUE_LIST_METAS_BY_ID(id))
            .then((res) => {
                setCurrentMyList(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchVenues = (id: number, page: number) => {
        axios
            .get(FETCH_VENUES_IN_VENUE_LIST_META(id, page))
            .then((res) => {
                setCurrentVenues(res.data)
                setCurrentPage(page + 1)
                const parsedLinkHeader = parse(res.headers['link'])
                const pageCount = Number(parsedLinkHeader.last.page) + 1
                setCurrentPageCount(pageCount)
            })
            .catch((err) => console.log(err))
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchVenues(currentMyList.id, value - 1)
    }

    const handleEditList = (placeList: IVenueListMeta) => {
        if (placeList && placeList.id !== null && placeList.id !== undefined) {
            authenticatedAction(() => {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.EditRestaurantList,
                    placeList: placeList,
                    onSuccess: () => fetchMyList(placeList.id),
                }
                openListModal(openListModalPayload)
            })
        }
    }

    const handleDeleteList = (placeList: IVenueListMeta) => {
        if (placeList && placeList.id !== null && placeList.id !== undefined) {
            authenticatedAction(() => {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.DeleteRestaurantList,
                    placeList: placeList,
                    onSuccess: () => fetchVenueLists(),
                }
                openListModal(openListModalPayload)
            })
        }
    }

    const handleShareList = (placeList: IVenueListMeta) => {
        const placeLink = `${window.location.origin}${R.ROUTE_ITEMS.userProfile}/${user.id}?v=${placeList.id}`
        navigator.clipboard
            .writeText(placeLink)
            .then(() => {
                enqueueSnackbar('', {
                    content: (
                        <div>
                            <Snackbar
                                type={B.RESTAURANT_LIST_LINK_COPIED.Type}
                                title={B.RESTAURANT_LIST_LINK_COPIED.Title}
                                message={
                                    <SnackbarMessageBody>
                                        {placeList.title ? (
                                            <>
                                                Link for&nbsp;
                                                <SnackbarOrangeMessage>{placeList.title}</SnackbarOrangeMessage>
                                                &nbsp;was copied!
                                            </>
                                        ) : (
                                            B.RESTAURANT_LIST_LINK_COPIED.Body
                                        )}
                                    </SnackbarMessageBody>
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

    const handleRemoveFromList = (venue: IVenue) => {
        if (currentMyList && venue) {
            authenticatedAction(() => {
                const token = getTokenConfig()
                const config = {
                    headers: {
                        Authorization: token,
                    },
                }
                axios
                    .delete(DELETE_VENUE_FROM_LIST(currentMyList.id, venue.id), config)
                    .then((res) => {
                        console.log('Successfully deleted the venue: ', res)
                        enqueueSnackbar('', {
                            content: (
                                <div>
                                    <Snackbar
                                        type={B.REMOVE_FROM_LIST.Type}
                                        title={B.REMOVE_FROM_LIST.Title}
                                        message={
                                            <SnackbarMessageBody>
                                                {venue.name && currentMyList ? (
                                                    <>
                                                        <SnackbarOrangeMessage>{venue.name}</SnackbarOrangeMessage>
                                                        &nbsp;{B.REMOVE_FROM_LIST.Body}{' '}
                                                        <SnackbarOrangeMessage>
                                                            {currentMyList.title}
                                                        </SnackbarOrangeMessage>
                                                    </>
                                                ) : (
                                                    'Restaurant removed'
                                                )}
                                            </SnackbarMessageBody>
                                        }
                                    />
                                </div>
                            ),
                        })
                        fetchVenues(inputMyList.id, 0)
                    })
                    .catch((err) => console.log(err))
            })
        }
    }

    return (
        <>
            <UserProfileListsMainViewHeaderContainer>
                <UserProfileListsMainViewHeaderTextContainer>
                    <UserProfileListsMainViewListTitle>
                        {currentMyList ? currentMyList.title : null}
                    </UserProfileListsMainViewListTitle>
                    <UserProfileListsMainViewListDescription>
                        {currentMyList ? currentMyList.summary : null}
                    </UserProfileListsMainViewListDescription>
                </UserProfileListsMainViewHeaderTextContainer>
                <UserProfileListsMainViewControlsContainer>
                    {isOwner && currentMyList ? (
                        <Tooltip title={S.TOOL_TIPS.EditList} placement="top" arrow={true}>
                            <ListControlButton onClick={() => handleEditList(currentMyList)}>
                                <EditIcon />
                            </ListControlButton>
                        </Tooltip>
                    ) : null}
                    {isOwner && currentMyList ? (
                        <Tooltip title={S.TOOL_TIPS.DeleteList} placement="top" arrow={true}>
                            <ListControlButton onClick={() => handleDeleteList(currentMyList)}>
                                <DeleteForeverIcon />
                            </ListControlButton>
                        </Tooltip>
                    ) : null}
                    <Tooltip title={S.TOOL_TIPS.ShareList} placement="top" arrow={true}>
                        <ListControlButton onClick={() => handleShareList(currentMyList)}>
                            <CallMadeIcon />
                        </ListControlButton>
                    </Tooltip>
                </UserProfileListsMainViewControlsContainer>
            </UserProfileListsMainViewHeaderContainer>
            <PaginationViewsListContainer>
                {currentVenues && currentVenues.length > 0
                    ? currentVenues.map((venue: IVenue) => (
                          <RecommendationCardContainer key={venue.id}>
                              <CardPlaceWide
                                  place={venue}
                                  type={
                                      isOwner === true ? CardPlaceWideEnum.ProfileOwnerList : CardPlaceWideEnum.Profile
                                  }
                                  handleRemoveFromList={handleRemoveFromList}
                              />
                          </RecommendationCardContainer>
                      ))
                    : 'Looks like your list is empty!'}
                {currentVenues && currentVenues.length > 0 && (
                    <Pagination
                        page={currentPage ? currentPage : 0}
                        count={currentPageCount ? currentPageCount : 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={handlePagination}
                    />
                )}
            </PaginationViewsListContainer>
        </>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentUser: state.userReducer.user,
    userRole: state.userReducer.userRole,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openListModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(MyListPaginationView))
