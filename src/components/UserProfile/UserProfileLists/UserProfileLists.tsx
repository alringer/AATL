import Collapse from '@material-ui/core/Collapse'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import DownArrow from 'assets/user-profile-list-down-arrow.svg'
import UpArrow from 'assets/user-profile-list-up-arrow.svg'
import { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import React from 'react'
import CardPlaceWideList from 'sections/CardsList/CardPlaceWideList'
import { IVenue, mockVenue } from 'utilities/types/venue'
import {
    UserProfileListsContainer,
    UserProfileListsMainViewContainer,
    UserProfileListsMainViewHeaderContainer,
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

// TODO: Remove mock data once data is fetched from the api
const listZero: IVenue[] = [mockVenue, mockVenue]
const listOne: IVenue[] = [mockVenue, mockVenue, mockVenue]

const UserProfileLists = () => {
    const classes = useStyles()
    const [expanded, setExpanded] = React.useState({
        myLists: false,
        byCity: false,
        byFood: false,
        myRecommendations: false,
    })
    const [currentListInView, setCurrentListInView] = React.useState(0)

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setExpanded({ ...expanded, [e.currentTarget.id]: !expanded[e.currentTarget.id] })
    }

    const handleViewList = (listID: number) => {
        setCurrentListInView(listID)
    }

    return (
        <UserProfileListsContainer>
            <UserProfileListsNavigationContainer>
                <UserProfileListsNavigationTitle>Food & Travel Journal</UserProfileListsNavigationTitle>
                <UserProfileListsNavigationMyListContainer>
                    <ListItem id="myLists" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>MY LISTS</UserProfileListsNavigationParentListTitle>
                        {expanded.myLists ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                    <Collapse in={expanded.myLists} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem button className={classes.nested} onClick={() => handleViewList(0)}>
                                <UserProfileListsNavigationChildListTitle
                                    id={currentListInView === 0 ? 'active' : 'list'}
                                >
                                    PLACES I WANT TO GO
                                </UserProfileListsNavigationChildListTitle>
                            </ListItem>
                            <ListItem button className={classes.nested} onClick={() => handleViewList(1)}>
                                <UserProfileListsNavigationChildListTitle
                                    id={currentListInView === 1 ? 'active' : 'list'}
                                >
                                    MAKES ME HANGRY
                                </UserProfileListsNavigationChildListTitle>
                            </ListItem>
                        </List>
                    </Collapse>
                </UserProfileListsNavigationMyListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="byCity" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>BY CITY</UserProfileListsNavigationParentListTitle>
                        {expanded.byCity ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                </UserProfileListsNavigationParentListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="byFood" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>
                            BY CATEGORY
                        </UserProfileListsNavigationParentListTitle>
                        {expanded.byFood ? (
                            <img src={UpArrow} alt="" style={{ marginLeft: '8px' }} />
                        ) : (
                            <img src={DownArrow} alt="" style={{ marginLeft: '8px' }} />
                        )}
                    </ListItem>
                </UserProfileListsNavigationParentListContainer>
                <UserProfileListsNavigationParentListContainer>
                    <ListItem id="myRecommendations" button onClick={handleClick}>
                        <UserProfileListsNavigationParentListTitle>
                            MY RECOMMENDATIONS
                        </UserProfileListsNavigationParentListTitle>
                    </ListItem>
                </UserProfileListsNavigationParentListContainer>
            </UserProfileListsNavigationContainer>
            <UserProfileListsMainViewContainer>
                <UserProfileListsMainViewHeaderContainer>
                    <UserProfileListsMainViewListTitle>
                        {currentListInView === 0 ? 'PLACES I WANT TO GO' : 'MAKES ME HANGRY'}
                    </UserProfileListsMainViewListTitle>
                    <UserProfileListsMainViewListDescription>
                        Awesome description of the list goes here!
                    </UserProfileListsMainViewListDescription>
                </UserProfileListsMainViewHeaderContainer>
                <CardPlaceWideList
                    places={currentListInView === 0 ? listZero : listOne}
                    type={CardPlaceWideEnum.Profile}
                />
            </UserProfileListsMainViewContainer>
        </UserProfileListsContainer>
    )
}

export default UserProfileLists
