import axios, { RECOMMENDATION_LIST_METAS } from 'config/AxiosConfig'
import * as S from 'constants/StringConstants'
import React from 'react'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
import { IRecommendationListMeta } from 'utilities/types/recommendationListMeta'
import { AdminMenuPageSubTitle, AdminMenuPageTitle } from '../AdminShared.style'
import { AdminRecommendationListsContainer, FeatureListsTitle } from './AdminRecommendationLists.style'
import AdminRecommendationListsController from './AdminRecommendationListsController'

interface IAdminRecommendationListsProps extends IWithAuthInjectedProps {}

const AdminRecommendationLists: React.FC<IAdminRecommendationListsProps> = ({ getTokenConfig }) => {
    const [featuredLists, setFeaturedLists] = React.useState({ id: 0, lists: [] })
    const [otherLists, setOtherLists] = React.useState({ id: 1, lists: [] })

    React.useEffect(() => {
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
                    console.log('Each list: ', recommendationList)
                    if (recommendationList.featuredList) {
                        tempFeaturedLists.push(recommendationList)
                    } else {
                        tempOtherLists.push(recommendationList)
                    }
                })
                setFeaturedLists({ ...featuredLists, lists: tempFeaturedLists })
                setOtherLists({ ...otherLists, lists: tempOtherLists })
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <AdminRecommendationListsContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminRecommendationLists.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminRecommendationLists.SubTitle}</AdminMenuPageSubTitle>
            <FeatureListsTitle>{S.ADMIN_PAGE.AdminRecommendationLists.FeaturedLists}</FeatureListsTitle>
            <AdminRecommendationListsController recommendationLists={featuredLists.lists} />
            <FeatureListsTitle>{S.ADMIN_PAGE.AdminRecommendationLists.OtherLists}</FeatureListsTitle>
            <AdminRecommendationListsController recommendationLists={otherLists.lists} />
        </AdminRecommendationListsContainer>
    )
}

export default withAuth(AdminRecommendationLists)
