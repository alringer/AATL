import AdminCities from 'components/Admin/AdminCities/AdminCities'
import AdminFlaggedContent from 'components/Admin/AdminFlaggedContent/AdminFlaggedContent'
import AdminMenu from 'components/Admin/AdminMenu/AdminMenu'
import AdminRecommendationLists from 'components/Admin/AdminRecommendationLists/AdminRecommendationLists'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import axios, { ADMIN_CITIES, FLAGGED_RECOMMENDATIONS, RECOMMENDATION_LIST_METAS } from 'config/AxiosConfig'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import parse from 'parse-link-header'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { AdminContainer, AdminContentContainer, AdminVerifyingText } from 'style/Admin.style'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { useAuth } from 'utilities/providers/AuthProvider'
import { IAdminCity } from 'utilities/types/adminCity'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IFlaggedRecommendation, IFlaggedRecommendationSort } from 'utilities/types/flaggedRecommendation'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'

interface IReduxProps {
    userRole: string | null
    isLoading: boolean
}
interface IAdminProps extends IReduxProps, IWithAuthInjectedProps {}

const Admin: React.FC<IAdminProps> = ({ userRole, isLoading, getTokenConfig, keycloak }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { isMounted } = useAuth()

    // Cities
    const [listCities, setListCities] = React.useState<IAdminCity[]>([])
    const [isLoadingCities, setLoadingCities] = React.useState(false)
    // Flagged Content
    const [listFlaggedRecommendations, setListFlaggedRecommendations] = React.useState<IFlaggedRecommendation[]>([])
    const [isLoadingFlaggedRecommendations, setLoadingFlaggedRecommendations] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState(0)
    const [currentPageCount, setCurrentPageCount] = React.useState(0)
    const [currentTotal, setCurrentTotal] = React.useState(0)
    // Recommendation Lists
    const [featuredLists, setFeaturedLists] = React.useState<IRecommendationListMeta[]>([])
    const [otherLists, setOtherLists] = React.useState<IRecommendationListMeta[]>([])
    const [isLoadingRecommendationLists, setLoadingRecommendationLists] = React.useState(false)

    React.useEffect(() => {
        if (
            isMounted === true &&
            isLoading === false &&
            (userRole !== UserRoleEnum.Admin || keycloak.authenticated === false)
        ) {
            router.push('/')
            enqueueSnackbar('', {
                content: (
                    <div>
                        <Snackbar
                            type={B.ERROR_NOT_ADMIN.Type}
                            title={B.ERROR_NOT_ADMIN.Title}
                            message={<SnackbarMessageBody>{B.ERROR_NOT_ADMIN.Body}</SnackbarMessageBody>}
                        />
                    </div>
                ),
            })
        }
    }, [userRole, isMounted, isLoading, keycloak])

    React.useEffect(() => {
        if (
            router.query.menu !== R.ROUTE_ITEMS.adminCities &&
            router.query.menu !== R.ROUTE_ITEMS.adminFlaggedContent &&
            router.query.menu !== R.ROUTE_ITEMS.adminRecommendationLists
        ) {
            router.push(`${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminCities}`, undefined, {
                shallow: true,
            })
        }
    }, [])

    React.useEffect(() => {
        fetchCities()
        fetchFlaggedRecommendations(0, IFlaggedRecommendationSort.dateDesc)
        fetchRecommendationLists()
    }, [])

    const fetchCities = () => {
        setLoadingCities(true)
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        axios
            .get(ADMIN_CITIES, config)
            .then((res) => {
                setListCities(res.data)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoadingCities(false)
            })
    }

    const fetchFlaggedRecommendations = (page: number, sort: IFlaggedRecommendationSort) => {
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        setLoadingFlaggedRecommendations(true)
        axios
            .get(FLAGGED_RECOMMENDATIONS(page, sort), config)
            .then((res) => {
                let newRecommendations = []
                if (res.data) {
                    res.data.map((flaggedRecommendation: IFlaggedRecommendation) => {
                        newRecommendations = [
                            ...newRecommendations,
                            { ...flaggedRecommendation, date: new Date(flaggedRecommendation.date) },
                        ]
                    })
                }
                setListFlaggedRecommendations(newRecommendations)
                setCurrentPage(page + 1)
                const parsedLinkHeader = parse(res.headers['link'])
                const pageCount = Number(parsedLinkHeader.last.page) + 1
                const total = Number(res.headers['x-total-count'])
                setCurrentPageCount(pageCount)
                setCurrentTotal(total)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoadingFlaggedRecommendations(false)
            })
    }

    const fetchRecommendationLists = () => {
        setLoadingRecommendationLists(true)
        const token = getTokenConfig()
        const config = {
            headers: {
                Authorization: token,
            },
        }
        axios
            .get(RECOMMENDATION_LIST_METAS, config)
            .then((res) => {
                const tempFeaturedLists = []
                const tempOtherLists = []
                res.data.map((recommendationList: IRecommendationListMeta) => {
                    if (recommendationList.featuredList) {
                        tempFeaturedLists.push(recommendationList)
                    } else {
                        tempOtherLists.push(recommendationList)
                    }
                })
                const sortedFeaturedLists = tempFeaturedLists.sort((a, b) =>
                    a.featuredList.sortOrder > b.featuredList.sortOrder ? 1 : -1
                )
                const sortedOtherLists = tempOtherLists
                setFeaturedLists(sortedFeaturedLists)
                setOtherLists(sortedOtherLists)
            })
            .catch((err) => console.log(err))
            .finally(() => {
                setLoadingRecommendationLists(false)
            })
    }

    return isMounted === true && isLoading === false && userRole === UserRoleEnum.Admin ? (
        <AdminContainer>
            <AdminMenu
                countCities={listCities.length}
                countFlagged={currentTotal}
                countRecommendationLists={otherLists.length + featuredLists.length}
            />
            <AdminContentContainer>
                {router.query.menu === R.ROUTE_ITEMS.adminCities ? (
                    <AdminCities listCities={listCities} isLoadingCities={isLoadingCities} />
                ) : router.query.menu === R.ROUTE_ITEMS.adminFlaggedContent ? (
                    <AdminFlaggedContent
                        listFlaggedRecommendations={listFlaggedRecommendations}
                        isLoadingFlaggedRecommendations={isLoadingFlaggedRecommendations}
                        currentPage={currentPage}
                        currentPageCount={currentPageCount}
                        fetchFlaggedRecommendations={fetchFlaggedRecommendations}
                    />
                ) : router.query.menu === R.ROUTE_ITEMS.adminRecommendationLists ? (
                    <AdminRecommendationLists
                        featuredLists={featuredLists}
                        otherLists={otherLists}
                        isLoadingRecommendationLists={isLoadingRecommendationLists}
                        fetchRecommendationLists={fetchRecommendationLists}
                    />
                ) : null}
            </AdminContentContainer>
        </AdminContainer>
    ) : (
        <AdminVerifyingText>Verifying user role...</AdminVerifyingText>
    )
}

const mapStateToProps = (state: StoreState) => ({
    userRole: state.userReducer.userRole,
    isLoading: state.userReducer.isLoading,
})

export default reduxConnect(mapStateToProps)(withAuth(Admin))
