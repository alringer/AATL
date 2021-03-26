import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DownArrow from 'assets/user-profile-list-down-arrow.svg'
import UpArrow from 'assets/user-profile-list-up-arrow.svg'
import axios, { FETCH_VENUE_LISTS, FETCH_VENUE_LISTS_BY_CATEGORY, FETCH_VENUE_LISTS_BY_CITY } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import { openListModal } from 'store/listModal/listModal_actions'
import { OpenListModalPayload } from 'store/listModal/listModal_types'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IByCategory, IByCategoryWithUniqueID } from 'utilities/types/byCategory'
import { IByCity, IByCityWithUniqueID } from 'utilities/types/byCity'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenueListMeta, IVenueListMetaWithUniqueID } from 'utilities/types/venueListMeta'
import ByCategoryPaginationView from './PaginationViews/ByCategoryPaginationView'
import ByCityPaginationView from './PaginationViews/ByCityPaginationView'
import MyListPaginationView from './PaginationViews/MyListPaginationView'
import RecommendationsPaginationView from './PaginationViews/RecommendationsPaginationView'
import {
    UserProfileListsContainer,
    UserProfileListsMainViewContainer,
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
    venueListMetaId: number | null
}

const UserProfileLists: React.FC<IUserProfileListsProps> = ({
    user,
    currentUser,
    userRole,
    getTokenConfig,
    openListModal,
    authenticatedAction,
    venueListMetaId,
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
    // List States
    const [currentMyList, setCurrentMyList] = React.useState<IVenueListMetaWithUniqueID | null>(null)
    const [currentByCity, setCurrentByCity] = React.useState<IByCityWithUniqueID | null>(null)
    const [currentByCategory, setCurrentByCategory] = React.useState<IByCategoryWithUniqueID | null>(null)

    let uniqueID = 0

    React.useEffect(() => {
        fetchVenueLists()
        fetchVenueListsByCity()
        fetchVenueListsByCategory()
    }, [])

    const fetchVenueLists = () => {
        axios
            .get(FETCH_VENUE_LISTS(user.id))
            .then((res) => {
                const modifiedMyLists: IVenueListMetaWithUniqueID[] = res.data.map((item: IVenueListMeta) => {
                    const currentUniqueID = uniqueID
                    uniqueID = uniqueID + 1
                    return {
                        ...item,
                        uniqueListID: currentUniqueID,
                    }
                })
                setMyLists(modifiedMyLists)
                if (modifiedMyLists.length > 0) {
                    setExpanded({ ...expanded, myLists: true })
                    if (venueListMetaId !== null) {
                        handleViewMyList(
                            modifiedMyLists.find((modifiedMyList) => {
                                return modifiedMyList.id === venueListMetaId
                            })
                        )
                    } else {
                        handleViewMyList(modifiedMyLists[0])
                    }
                } else {
                    setCurrentListInView(null)
                    setCurrentListInViewUniqueID(null)
                    setCurrentListInViewType(null)
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
            })
            .catch((err) => console.log(err))
    }

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setExpanded({ ...expanded, [e.currentTarget.id]: !expanded[e.currentTarget.id] })
    }

    const handleViewMyList = (list: IVenueListMetaWithUniqueID) => {
        setCurrentListInViewUniqueID(list.uniqueListID)
        setCurrentListInView(list)
        setCurrentListInViewType(CurrentListInViewTypeEnum.MyList)
        setCurrentMyList(list)
    }

    const handleViewByCityList = (city: IByCityWithUniqueID, page: number) => {
        setCurrentListInViewUniqueID(city.uniqueListID)
        setCurrentByCity(city)
        setCurrentListInView(city)
        setCurrentListInViewType(CurrentListInViewTypeEnum.ByCity)
    }
    const handleViewByCategoryList = (category: IByCategoryWithUniqueID, page: number) => {
        setCurrentListInViewUniqueID(category.uniqueListID)
        setCurrentByCategory(category)
        setCurrentListInView(category)
        setCurrentListInViewType(CurrentListInViewTypeEnum.ByCategory)
    }

    const handleViewRecommendations = () => {
        setCurrentListInViewUniqueID(-1)
        setCurrentListInView(null)
        setCurrentListInViewType(CurrentListInViewTypeEnum.MyRecommendation)
    }

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
                    <ListItem id="myRecommendations" button onClick={handleViewRecommendations}>
                        <UserProfileListsNavigationParentListTitle
                            id={currentListInViewUniqueID === -1 ? 'active' : 'list'}
                        >
                            {S.USER_PROFILE_LISTS.MyRecommendations}
                        </UserProfileListsNavigationParentListTitle>
                    </ListItem>
                </UserProfileListsNavigationParentListContainer>
            </UserProfileListsNavigationContainer>
            <UserProfileListsMainViewContainer>
                {currentListInViewType === null && (
                    <UserProfileListsMainViewHeaderContainer>
                        <UserProfileListsMainViewHeaderTextContainer>
                            <UserProfileListsMainViewListTitle>
                                {currentListInViewType === null && S.USER_PROFILE_LISTS.EmptyMessageTitle}
                            </UserProfileListsMainViewListTitle>
                            <UserProfileListsMainViewListDescription>
                                {currentListInViewType === null && S.USER_PROFILE_LISTS.EmptyMessageSubTitle}
                            </UserProfileListsMainViewListDescription>
                        </UserProfileListsMainViewHeaderTextContainer>
                    </UserProfileListsMainViewHeaderContainer>
                )}
                {currentListInViewType === CurrentListInViewTypeEnum.MyList ? (
                    <MyListPaginationView
                        inputMyList={currentMyList}
                        user={user}
                        isOwner={isOwner}
                        fetchVenueLists={fetchVenueLists}
                    />
                ) : currentListInViewType === CurrentListInViewTypeEnum.ByCity ? (
                    <ByCityPaginationView inputByCity={currentByCity} user={user} />
                ) : currentListInViewType === CurrentListInViewTypeEnum.ByCategory ? (
                    <ByCategoryPaginationView inputByCategory={currentByCategory} user={user} />
                ) : currentListInViewType === CurrentListInViewTypeEnum.MyRecommendation ? (
                    <RecommendationsPaginationView user={user} />
                ) : null}
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
