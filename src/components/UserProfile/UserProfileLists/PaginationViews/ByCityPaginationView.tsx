import Pagination from '@material-ui/lab/Pagination'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import axios, { FETCH_VENUE_LIST_CITY } from 'config/AxiosConfig'
import parse from 'parse-link-header'
import React from 'react'
import { RecommendationCardContainer } from 'sections/CardsList/List.style'
import { IByCityWithUniqueID } from 'utilities/types/byCity'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenue } from 'utilities/types/venue'
import {
    UserProfileListsMainViewHeaderContainer,
    UserProfileListsMainViewHeaderTextContainer,
    UserProfileListsMainViewListTitle,
} from '../UserProfileLists.style'
import { PaginationViewsListContainer } from './PaginationViews.style'

interface IByCityPaginationViewProps {
    inputByCity: IByCityWithUniqueID
    user: IUserProfile
}

const ByCityPaginationView: React.FC<IByCityPaginationViewProps> = ({ inputByCity, user }) => {
    const [currentByCity, setCurrentByCity] = React.useState<IByCityWithUniqueID | null>(null)
    const [currentVenues, setCurrentVenues] = React.useState<IVenue[]>([])
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)

    React.useEffect(() => {
        if (inputByCity && inputByCity.id) {
            setCurrentByCity(inputByCity)
            fetchVenues(inputByCity.id, 0)
        }
    }, [inputByCity])

    const fetchVenues = (id: number, page: number) => {
        if (user) {
            axios
                .get(FETCH_VENUE_LIST_CITY(id, user.id, page))
                .then((res) => {
                    res.data.map((item: IVenue) =>
                        item.categories.sort((category1, category2) =>
                            category1.longName.toLocaleLowerCase() > category2.longName.toLocaleLowerCase() ? 1 : -1
                        )
                    )
                    setCurrentVenues(res.data)
                    setCurrentPage(page + 1)
                    const parsedLinkHeader = parse(res.headers['link'])
                    const pageCount = Number(parsedLinkHeader.last.page) + 1
                    setCurrentPageCount(pageCount)
                })
                .catch((err) => console.log(err))
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchVenues(currentByCity.id, value - 1)
    }

    return (
        <>
            <UserProfileListsMainViewHeaderContainer>
                <UserProfileListsMainViewHeaderTextContainer>
                    <UserProfileListsMainViewListTitle>
                        {currentByCity ? currentByCity.city : null}
                    </UserProfileListsMainViewListTitle>
                    {/* <UserProfileListsMainViewListDescription>
                        {currentByCity ? currentByCity.summary : null}
                    </UserProfileListsMainViewListDescription> */}
                </UserProfileListsMainViewHeaderTextContainer>
            </UserProfileListsMainViewHeaderContainer>
            <PaginationViewsListContainer>
                {currentVenues
                    ? currentVenues.map((venue: IVenue, index: number) => (
                          <RecommendationCardContainer key={index}>
                              <CardPlaceWide place={venue} type={CardPlaceWideEnum.Profile} />
                          </RecommendationCardContainer>
                      ))
                    : null}
                {currentVenues && (
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

export default ByCityPaginationView
