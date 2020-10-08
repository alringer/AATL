import { CircularProgress } from '@material-ui/core'
import axios, { RECOMMENDATION_LIST_METAS } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import {
    AdminRecommendationListsContainer,
    AdminRecommendationListsTableContainer,
    FeatureListsTitle,
} from './AdminRecommendationLists.style'
import AdminRecommendationListsController from './AdminRecommendationListsController'

interface IAdminRecommendationListsProps extends IWithAuthInjectedProps {}

const AdminRecommendationLists: React.FC<IAdminRecommendationListsProps> = ({ getTokenConfig }) => {
    const [featuredLists, setFeaturedLists] = React.useState<IRecommendationListMeta[]>([])
    const [otherLists, setOtherLists] = React.useState<IRecommendationListMeta[]>([])
    const [isLoading, setLoading] = React.useState(false)

    React.useEffect(() => {
        fetchRecommendationLists()
    }, [])

    const fetchRecommendationLists = () => {
        setLoading(true)
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
                console.log('Fetched Recommendation List Metas: ', res)
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
                setLoading(false)
            })
    }

    return (
        <AdminRecommendationListsContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminRecommendationLists.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminRecommendationLists.SubTitle}</AdminMenuPageSubTitle>
            <FeatureListsTitle>{S.ADMIN_PAGE.AdminRecommendationLists.FeaturedLists}</FeatureListsTitle>
            {isLoading ? (
                <AdminRecommendationListsTableContainer>
                    <CircularProgress />
                </AdminRecommendationListsTableContainer>
            ) : (
                <AdminRecommendationListsController
                    recommendationLists={featuredLists}
                    featured={true}
                    fetchRecommendationLists={fetchRecommendationLists}
                />
            )}
            <FeatureListsTitle>{S.ADMIN_PAGE.AdminRecommendationLists.OtherLists}</FeatureListsTitle>
            {isLoading ? (
                <AdminRecommendationListsTableContainer>
                    <CircularProgress />
                </AdminRecommendationListsTableContainer>
            ) : (
                <AdminRecommendationListsController
                    recommendationLists={otherLists}
                    featured={false}
                    fetchRecommendationLists={fetchRecommendationLists}
                />
            )}
        </AdminRecommendationListsContainer>
    )
}

export default withAuth(AdminRecommendationLists)
