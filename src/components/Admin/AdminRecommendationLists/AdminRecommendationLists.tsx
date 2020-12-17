import { CircularProgress } from '@material-ui/core'
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

interface IAdminRecommendationListsProps extends IWithAuthInjectedProps {
    featuredLists: IRecommendationListMeta[]
    otherLists: IRecommendationListMeta[]
    isLoadingRecommendationLists: boolean
    fetchRecommendationLists: () => void
}

const AdminRecommendationLists: React.FC<IAdminRecommendationListsProps> = ({
    featuredLists,
    otherLists,
    isLoadingRecommendationLists,
    fetchRecommendationLists,
}) => {
    return (
        <AdminRecommendationListsContainer>
            <AdminMenuPageTitle>{S.ADMIN_PAGE.AdminRecommendationLists.Title}</AdminMenuPageTitle>
            <AdminMenuPageSubTitle>{S.ADMIN_PAGE.AdminRecommendationLists.SubTitle}</AdminMenuPageSubTitle>
            <FeatureListsTitle>{S.ADMIN_PAGE.AdminRecommendationLists.FeaturedLists}</FeatureListsTitle>
            {isLoadingRecommendationLists ? (
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
            {isLoadingRecommendationLists ? (
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
