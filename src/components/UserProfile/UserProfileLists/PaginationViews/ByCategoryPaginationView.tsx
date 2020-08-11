import Pagination from '@material-ui/lab/Pagination'
import CardPlaceWide, { CardPlaceWideEnum } from 'components/CardPlaceWide/CardPlaceWide'
import axios, { FETCH_VENUE_LIST_CATEGORY } from 'config/AxiosConfig'
import parse from 'parse-link-header'
import React from 'react'
import { RecommendationCardContainer } from 'sections/CardsList/List.style'
import { IByCategoryWithUniqueID } from 'utilities/types/byCategory'
import { IUserProfile } from 'utilities/types/userProfile'
import { IVenue } from 'utilities/types/venue'
import {
    UserProfileListsMainViewHeaderContainer,
    UserProfileListsMainViewHeaderTextContainer,
    UserProfileListsMainViewListTitle,
} from '../UserProfileLists.style'
import { PaginationViewsListContainer } from './PaginationViews.style'

interface IByCategoryPaginationViewProps {
    inputByCategory: IByCategoryWithUniqueID
    user: IUserProfile
}

const ByCategoryPaginationView: React.FC<IByCategoryPaginationViewProps> = ({ inputByCategory, user }) => {
    const [currentByCategory, setCurrentByCategory] = React.useState<IByCategoryWithUniqueID | null>(null)
    const [currentVenues, setCurrentVenues] = React.useState<IVenue[]>([])
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)

    React.useEffect(() => {
        if (inputByCategory && inputByCategory.id) {
            setCurrentByCategory(inputByCategory)
            fetchVenues(inputByCategory.id, 0)
        }
    }, [inputByCategory])

    const fetchVenues = (id: number, page: number) => {
        if (user) {
            axios
                .get(FETCH_VENUE_LIST_CATEGORY(id, user.id, page))
                .then((res) => {
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
        fetchVenues(currentByCategory.id, value - 1)
    }

    return (
        <>
            <UserProfileListsMainViewHeaderContainer>
                <UserProfileListsMainViewHeaderTextContainer>
                    <UserProfileListsMainViewListTitle>
                        {currentByCategory ? currentByCategory.longName : null}
                    </UserProfileListsMainViewListTitle>
                    {/* <UserProfileListsMainViewListDescription>
                        {currentByCategory ? currentByCategory.summary : null}
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

export default ByCategoryPaginationView
