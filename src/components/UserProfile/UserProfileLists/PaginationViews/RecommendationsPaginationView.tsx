import Pagination from '@material-ui/lab/Pagination'
import CardRecommendationWide from 'components/CardRecommendationWide/CardRecommendationWide'
import axios, { FETCH_USER_RECOMMENDATIONS } from 'config/AxiosConfig'
import parse from 'parse-link-header'
import React from 'react'
import { RecommendationCardContainer } from 'sections/CardsList/List.style'
import { IRecommendation } from 'utilities/types/recommendation'
import { IUserProfile } from 'utilities/types/userProfile'
import {
    UserProfileListsMainViewHeaderContainer,
    UserProfileListsMainViewHeaderTextContainer,
    UserProfileListsMainViewListTitle,
} from '../UserProfileLists.style'
import { PaginationViewsListContainer } from './PaginationViews.style'

interface IRecommendationsPaginationViewProps {
    user: IUserProfile
}

const RecommendationsPaginationView: React.FC<IRecommendationsPaginationViewProps> = ({ user }) => {
    const [currentRecommendations, setCurrentRecommendations] = React.useState<IRecommendation[] | null>(null)
    const [currentPage, setCurrentPage] = React.useState(null)
    const [currentPageCount, setCurrentPageCount] = React.useState(null)

    React.useEffect(() => {
        if (user && user.id !== undefined && user.id !== null) {
            fetchRecommendations(user.id, 0)
        }
    }, [user])

    const fetchRecommendations = (id: number, page: number) => {
        if (user) {
            axios
                .get(FETCH_USER_RECOMMENDATIONS(id, page))
                .then((res) => {
                    console.log('Fetched recommendations: ', res)
                    setCurrentRecommendations(res.data)
                    setCurrentPage(page + 1)
                    const parsedLinkHeader = parse(res.headers['link'])
                    const pageCount = Number(parsedLinkHeader.last.page) + 1
                    setCurrentPageCount(pageCount)
                })
                .catch((err) => console.log(err))
        }
    }

    const handlePagination = (event: React.ChangeEvent<unknown>, value: number) => {
        fetchRecommendations(user.id, value - 1)
    }

    return (
        <>
            <UserProfileListsMainViewHeaderContainer>
                <UserProfileListsMainViewHeaderTextContainer>
                    <UserProfileListsMainViewListTitle>
                        {currentRecommendations ? 'Recommendations' : null}
                    </UserProfileListsMainViewListTitle>
                    {/* <UserProfileListsMainViewListDescription>
                        {currentByCity ? currentByCity.summary : null}
                    </UserProfileListsMainViewListDescription> */}
                </UserProfileListsMainViewHeaderTextContainer>
            </UserProfileListsMainViewHeaderContainer>
            <PaginationViewsListContainer>
                {currentRecommendations
                    ? currentRecommendations.map((recommendation: IRecommendation, index: number) => (
                          <RecommendationCardContainer key={index}>
                              <CardRecommendationWide isFull={true} recommendation={recommendation} />
                          </RecommendationCardContainer>
                      ))
                    : null}
                {currentRecommendations && (
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

export default RecommendationsPaginationView
