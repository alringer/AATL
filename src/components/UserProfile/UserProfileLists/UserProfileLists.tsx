import { Tooltip } from '@material-ui/core'
import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import DownArrow from 'assets/user-profile-list-down-arrow.svg'
import UpArrow from 'assets/user-profile-list-up-arrow.svg'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import axios, {
    FETCH_USER_RECOMMENDATIONS,
    FETCH_VENUE_LISTS,
    FETCH_VENUE_LISTS_BY_CATEGORY,
    FETCH_VENUE_LISTS_BY_CITY,
    FETCH_VENUE_LIST_CATEGORY,
    FETCH_VENUE_LIST_CITY,
} from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ListContainer } from 'sections/CardsList/List.style'
import { StoreState } from 'store'
import { openListModal } from 'store/listModal/listModal_actions'
import { ListModalViewEnum, OpenListModalPayload } from 'store/listModal/listModal_types'
import { CustomIconButton } from 'style/Button/IconButton.style'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IByCategory, IByCategoryWithUniqueID } from 'utilities/types/byCategory'
import { IByCity, IByCityWithUniqueID } from 'utilities/types/byCity'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenue } from 'utilities/types/venue'
import { IVenueListMeta, IVenueListMetaWithUniqueID } from 'utilities/types/venueListMeta'
import {
    CallMadeIcon,
    DeleteForeverIcon,
    EditIcon,
    UserProfileListsContainer,
    UserProfileListsMainViewContainer,
    UserProfileListsMainViewControlsContainer,
    UserProfileListsMainViewHeaderContainer,
    UserProfileListsMainViewHeaderTextContainer,
    UserProfileListsMainViewListDescription,
    UserProfileListsMainViewListTitle,
    UserProfileListsNavigationChildListTitle,
    UserProfileListsNavigationContainer,
    UserProfileListsNavigationMyListContainer,
    UserProfileListsNavigationParentListContainer,
    UserProfileListsNavigationParentListTitle,
    UserProfileListsNavigationTitle,
} from './UserProfileLists.style'

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: 'white',
        },
        nested: {
            paddingLeft: '24px',
        },
    })
)

interface IReduxProps {
    currentUser: IUserProfile | null
    userRole: string | null
    openListModal: (payload: OpenListModalPayload) => void
}
interface IUserProfileListsProps extends IReduxProps, IWithAuthInjectedProps {
    user: IUserProfile
}

const UserProfileLists: React.FC<IUserProfileListsProps> = ({
    user,
    currentUser,
    userRole,
    getTokenConfig,
    openListModal,
    authenticatedAction,
}) => {
    const classes = useStyles()
    enum CurrentListInViewTypeEnum {
        MyList = 'MyList',
        ByCity = 'ByCity',
        ByCategory = 'ByCategory',
        MyRecommendation = 'MyRecommendation',
    }
    const isOwner = currentUser && user && currentUser.id === user.id
    const isAdmin = userRole === UserRoleEnum.Admin
    const [expanded, setExpanded] = React.useState({
        myLists: false,
        byCity: false,
        byFood: false,
        myRecommendations: false,
    })
    const [currentListInView, setCurrentListInView] = React.useState<
        IVenueListMeta | IVenueListMetaWithUniqueID | IByCityWithUniqueID | IByCategoryWithUniqueID | null
    >(null)
    const [currentListInViewUniqueID, setCurrentListInViewUniqueID] = React.useState<number | null>(null)
    const [currentListInViewType, setCurrentListInViewType] = React.useState<CurrentListInViewTypeEnum | null>(null)
    const [myLists, setMyLists] = React.useState<IVenueListMetaWithUniqueID[]>([])
    const [byCityLists, setByCityLists] = React.useState<IByCityWithUniqueID[]>([])
    const [byCategoryLists, setByCategoryLists] = React.useState<IByCategoryWithUniqueID[]>([])
    const [recommendationsList, setRecommendationsList] = React.useState([])
    // Pagination States
    const [currentVenuesList, setCurrentVenuesList] = React.useState([])
    const [currentRecommendationsList, setCurrentRecommendationsList] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState<number | null>(null)
    const [currentPageSize, setCurrentPageSize] = React.useState<number | null>(null)
    // Temp States
    const [currentPaginationView, setCurrentPaginationView] = React.useState<React.ReactElement | null>(null)
    const [title, setTitle] = React.useState(null)
    const [subTitle, setSubTitle] = React.useState(null)

    let uniqueID = 0

    React.useEffect(() => {
        console.log('isOwner: ', isOwner)
        console.log('isAdmin: ', isAdmin)
        fetchVenueLists()
        fetchVenueListsByCity()
        fetchVenueListsByCategory()
    }, [])

    React.useEffect(() => {
        console.log('::::Current Pagination in View: ', currentPaginationView)
    }, [currentPaginationView])

    const fetchMyRecommendations = () => {
        axios
            .get(FETCH_USER_RECOMMENDATIONS(user.id, 0))
            .then((res) => {
                console.log('My Recommendations: ', res)
                setRecommendationsList(res.data)
            })
            .catch((err) => console.log(err))
    }

    const fetchVenueLists = () => {
        axios
            .get(FETCH_VENUE_LISTS(user.id))
            .then((res) => {
                const modifiedMyLists = res.data.map((item: IVenueListMeta) => {
                    const currentUniqueID = uniqueID
                    uniqueID = uniqueID + 1
                    return {
                        ...item,
                        uniqueListID: currentUniqueID,
                    }
                })
                setMyLists(modifiedMyLists)
                if (modifiedMyLists.length > 0) {
                    // setCurrentListInView(modifiedMyLists[0])
                    setCurrentListInViewUniqueID(modifiedMyLists[0].uniqueListID)
                    setCurrentListInViewType(CurrentListInViewTypeEnum.MyList)
                    setTitle(modifiedMyLists[0].title)
                    setSubTitle(modifiedMyLists[0].summary)
                    setExpanded({ ...expanded, myLists: true })
                }
            })
            .catch((err) => console.log(err))
    }

    const fetchVenueListsByCity = () => {
        axios
            .get(FETCH_VENUE_LISTS_BY_CITY(user.id))
            .then((res) => {
                const modifiedMyLists = res.data.map((item: IByCity) => {
                    const currentUniqueID = uniqueID
                    uniqueID = uniqueID + 1
                    return {
                        ...item,
                        uniqueListID: currentUniqueID,
                    }
                })
                setByCityLists(modifiedMyLists)
                if (res.data.length > 0) {
                    // setCurrentListInView(res.data[0])
                    // setExpanded({ ...expanded, myLists: true })
                }
            })
            .catch((err) => console.log(err))
    }

    const fetchVenueListsByCategory = () => {
        axios
            .get(FETCH_VENUE_LISTS_BY_CATEGORY(user.id))
            .then((res) => {
                const modifiedMyLists = res.data.map((item: IByCategory) => {
                    const currentUniqueID = uniqueID
                    uniqueID = uniqueID + 1
                    return {
                        ...item,
                        uniqueListID: currentUniqueID,
                    }
                })
                setByCategoryLists(modifiedMyLists)
                if (res.data.length > 0) {
                    // setCurrentListInView(res.data[0])
                    // setExpanded({ ...expanded, myLists: true })
                }
            })
            .catch((err) => console.log(err))
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setExpanded({ ...expanded, [e.currentTarget.id]: !expanded[e.currentTarget.id] })
    }

    const handleViewMyList = (list: IVenueListMetaWithUniqueID) => {
        setCurrentListInViewUniqueID(list.uniqueListID)
        console.log('Target object: ', list)
        setCurrentListInView(list)
        setCurrentListInViewType(CurrentListInViewTypeEnum.MyList)
    }

    const handleViewByCityList = (city: IByCityWithUniqueID, page: number) => {
        setCurrentListInViewUniqueID(city.uniqueListID)
        console.log('Target object: ', city)
        axios
            .get(FETCH_VENUE_LIST_CITY(city.id, user.id, page))
            .then((res) => {
                console.log('Paginate byCity list: ', res)
                setTitle(city.city)
                setSubTitle(null)
                setCurrentVenuesList(res.data)
                renderByCityPagination(city.id)
            })
            .catch((err) => console.log(err))
        setCurrentListInView(city)
        setCurrentListInViewType(CurrentListInViewTypeEnum.ByCity)
        // paginateByCity(city.id, page)
    }
    const handleViewByCategoryList = (category: IByCategoryWithUniqueID, page: number) => {
        setCurrentListInViewUniqueID(category.uniqueListID)
        console.log('Target object: ', category)
        axios
            .get(FETCH_VENUE_LIST_CITY(category.id, user.id, page))
            .then((res) => {
                console.log('Paginate byCity list: ', res)
                setTitle(category.longName)
                setSubTitle(null)
                renderByCategoryPagination(category.id)
            })
            .catch((err) => console.log(err))
        setCurrentListInView(category)
        setCurrentListInViewType(CurrentListInViewTypeEnum.ByCategory)
        // paginateByCategory(category.id, page)
    }

    const paginateMyList = (myListID: number, page: number) => {}
    const paginateByCity = (cityID: number, page: number) => {
        axios
            .get(FETCH_VENUE_LIST_CITY(cityID, user.id, page))
            .then((res) => {
                console.log('Paginate byCity list: ', res)
                setCurrentListInView(res.data)
                // setCurrentListInViewType(CurrentListInViewTypeEnum.VenuesList)
            })
            .catch((err) => console.log(err))
    }
    const paginateByCategory = (categoryID: number, page: number) => {
        axios
            .get(FETCH_VENUE_LIST_CATEGORY(categoryID, user.id, page))
            .then((res) => {
                console.log('Paginate byCategory list: ', res)
                setCurrentListInView(res.data)
                // setCurrentListInViewType(CurrentListInViewTypeEnum.VenuesList)
            })
            .catch((err) => console.log(err))
    }
    const paginateRecommendations = () => {}

    const handleEditList = (placeList: IVenueListMeta) => {
        if (placeList && placeList.id !== null && placeList.id !== undefined) {
            authenticatedAction(() => {
                const openListModalPayload: OpenListModalPayload = {
                    currentListModalView: ListModalViewEnum.EditRestaurantList,
                    placeList: placeList,
                    onSuccess: () => fetchVenueLists(),
                }
                openListModal(openListModalPayload)
            })
        }
    }

    const handleDeleteList = (placeList: IVenueListMeta) => {
        if (placeList && placeList.id !== null && placeList.id !== undefined) {
            const openListModalPayload: OpenListModalPayload = {
                currentListModalView: ListModalViewEnum.DeleteRestaurantList,
                placeList: placeList,
                onSuccess: () => fetchVenueLists(),
            }
            openListModal(openListModalPayload)
        }
    }

    const handleShareList = () => {}

    const renderMyListsPagination = (listID: number) => {
        setCurrentPaginationView(
            <ListContainer>
                {currentVenuesList
                    ? currentVenuesList.map((venue: IVenue) => (
                          <div key={venue.id}>
                              <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                          </div>
                      ))
                    : null}
                {currentVenuesList && (
                    <Pagination
                        page={currentPage ? currentPage : 0}
                        count={currentPageSize ? currentPageSize : 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => paginateMyList(listID, value)}
                    />
                )}
            </ListContainer>
        )
    }
    const renderByCityPagination = (listID: number) => {
        setCurrentPaginationView(
            <ListContainer>
                {currentVenuesList
                    ? currentVenuesList.map((venue: IVenue) => (
                          <div key={venue.id}>
                              <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                          </div>
                      ))
                    : null}
                {currentVenuesList && (
                    <Pagination
                        page={currentPage ? currentPage : 0}
                        count={currentPageSize ? currentPageSize : 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event: React.ChangeEvent<unknown>, value: number) => paginateByCity(listID, value)}
                    />
                )}
            </ListContainer>
        )
    }
    const renderByCategoryPagination = (listID: number) => {
        setCurrentPaginationView(
            <ListContainer>
                {currentVenuesList
                    ? currentVenuesList.map((venue: IVenue) => (
                          <div key={venue.id}>
                              <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                          </div>
                      ))
                    : null}
                {currentVenuesList && (
                    <Pagination
                        page={currentPage ? currentPage : 0}
                        count={currentPageSize ? currentPageSize : 0}
                        variant="outlined"
                        shape="rounded"
                        onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                            paginateByCategory(listID, value)
                        }
                    />
                )}
            </ListContainer>
        )
    }
    const renderRecommendationsPagination = () => {}

    return (
        <UserProfileListsContainer>
            <UserProfileListsNavigationContainer>
                <UserProfileListsNavigationTitle>
                    {S.USER_PROFILE_LISTS.FoodAndTravelJournal}
                </UserProfileListsNavigationTitle>
                <UserProfileListsNavigationMyListContainer>
                    <ListItem id="myLists" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>
                            {S.USER_PROFILE_LISTS.MyLists}
                        </UserProfileListsNavigationParentListTitle>
                        {expanded.myLists ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                    <Collapse in={expanded.myLists} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {myLists.map((myList: IVenueListMetaWithUniqueID) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={() => handleViewMyList(myList)}
                                    key={myList.uniqueListID}
                                >
                                    <UserProfileListsNavigationChildListTitle
                                        id={currentListInViewUniqueID === myList.uniqueListID ? 'active' : 'list'}
                                    >
                                        {myList.title}
                                    </UserProfileListsNavigationChildListTitle>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </UserProfileListsNavigationMyListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="byCity" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>
                            {S.USER_PROFILE_LISTS.ByCity}
                        </UserProfileListsNavigationParentListTitle>
                        {expanded.byCity ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                    <Collapse in={expanded.byCity} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {byCityLists.map((byCityList: IByCityWithUniqueID) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={() => handleViewByCityList(byCityList, 0)}
                                    key={byCityList.uniqueListID}
                                >
                                    <UserProfileListsNavigationChildListTitle
                                        id={currentListInViewUniqueID === byCityList.uniqueListID ? 'active' : 'list'}
                                    >
                                        {byCityList.city} ({byCityList.count})
                                    </UserProfileListsNavigationChildListTitle>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </UserProfileListsNavigationParentListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="byFood" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>
                            {S.USER_PROFILE_LISTS.ByCategory}
                        </UserProfileListsNavigationParentListTitle>
                        {expanded.byFood ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                    <Collapse in={expanded.byFood} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {byCategoryLists.map((byCategoryList: IByCategoryWithUniqueID) => (
                                <ListItem
                                    button
                                    className={classes.nested}
                                    onClick={() => handleViewByCategoryList(byCategoryList, 0)}
                                    key={byCategoryList.uniqueListID}
                                >
                                    <UserProfileListsNavigationChildListTitle
                                        id={
                                            currentListInViewUniqueID === byCategoryList.uniqueListID
                                                ? 'active'
                                                : 'list'
                                        }
                                    >
                                        {byCategoryList.longName} ({byCategoryList.venueCount})
                                    </UserProfileListsNavigationChildListTitle>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </UserProfileListsNavigationParentListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="myRecommendations" button onClick={fetchMyRecommendations}>
                        <UserProfileListsNavigationParentListTitle>
                            {S.USER_PROFILE_LISTS.MyRecommendations}
                        </UserProfileListsNavigationParentListTitle>
                    </ListItem>
                </UserProfileListsNavigationParentListContainer>
            </UserProfileListsNavigationContainer>
            <UserProfileListsMainViewContainer>
                <UserProfileListsMainViewHeaderContainer>
                    <UserProfileListsMainViewHeaderTextContainer>
                        <UserProfileListsMainViewListTitle>
                            {title ? title : S.USER_PROFILE_LISTS.EmptyMessageTitle}
                        </UserProfileListsMainViewListTitle>
                        <UserProfileListsMainViewListDescription>
                            {subTitle ? subTitle : S.USER_PROFILE_LISTS.EmptyMessageSubTitle}
                        </UserProfileListsMainViewListDescription>
                    </UserProfileListsMainViewHeaderTextContainer>
                    {isOwner && currentListInView ? (
                        <UserProfileListsMainViewControlsContainer>
                            <Tooltip title={S.TOOL_TIPS.EditList} placement="top" arrow={true}>
                                <CustomIconButton onClick={() => handleEditList(currentListInView)}>
                                    <EditIcon />
                                </CustomIconButton>
                            </Tooltip>
                            <Tooltip title={S.TOOL_TIPS.DeleteList} placement="top" arrow={true}>
                                <CustomIconButton onClick={() => handleDeleteList(currentListInView)}>
                                    <DeleteForeverIcon />
                                </CustomIconButton>
                            </Tooltip>

                            <Tooltip title={S.TOOL_TIPS.ShareList} placement="top" arrow={true}>
                                <CustomIconButton>
                                    <CallMadeIcon />
                                </CustomIconButton>
                            </Tooltip>
                        </UserProfileListsMainViewControlsContainer>
                    ) : null}
                </UserProfileListsMainViewHeaderContainer>
                {currentListInViewType === CurrentListInViewTypeEnum.MyList ? (
                    <ListContainer>
                        {currentVenuesList
                            ? currentVenuesList.map((venue: IVenue) => (
                                  <div key={venue.id}>
                                      <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                                  </div>
                              ))
                            : null}
                        {currentVenuesList && (
                            <Pagination
                                page={currentPage ? currentPage : 0}
                                count={currentPageSize ? currentPageSize : 0}
                                variant="outlined"
                                shape="rounded"
                                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                                    paginateMyList(currentListInView.id, value)
                                }
                            />
                        )}
                    </ListContainer>
                ) : currentListInViewType === CurrentListInViewTypeEnum.ByCity ? (
                    <ListContainer>
                        {currentVenuesList
                            ? currentVenuesList.map((venue: IVenue) => (
                                  <div key={venue.id}>
                                      <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                                  </div>
                              ))
                            : null}
                        {currentVenuesList && (
                            <Pagination
                                page={currentPage ? currentPage : 0}
                                count={currentPageSize ? currentPageSize : 0}
                                variant="outlined"
                                shape="rounded"
                                onChange={(event: React.ChangeEvent<unknown>, value: number) =>
                                    paginateByCity(currentListInView.id, value)
                                }
                            />
                        )}
                    </ListContainer>
                ) : null}
                {/* {currentVenuesList ? (
                    currentVenuesList && currentVenuesList.length > 0 ? (
                        <CardPlaceWideList
                            places={currentVenuesList ? currentVenuesList : null}
                            type={CardPlaceWideEnum.Profile}
                        />
                    ) : (
                        'Looks like your list is empty!'
                    )
                ) : null} */}
            </UserProfileListsMainViewContainer>
        </UserProfileListsContainer>
    )
}

const mapStateToProps = (state: StoreState) => ({
    currentUser: state.userReducer.user,
    userRole: state.userReducer.userRole,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ openListModal }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(UserProfileLists))

// TODO: Fetch byCity list
// TODO: Implement pagination for byCity
// TODO: Fetch byCategory list
// TODO: Implement pagination for byCategory
// TODO: Fetch myRecommendation list
// TODO: Implement pagination for myRecommendation list
