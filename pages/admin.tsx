import AdminCities from 'components/Admin/AdminCities/AdminCities'
import AdminFlaggedContent from 'components/Admin/AdminFlaggedContent/AdminFlaggedContent'
import AdminMenu from 'components/Admin/AdminMenu/AdminMenu'
import AdminRecommendationLists from 'components/Admin/AdminRecommendationLists/AdminRecommendationLists'
import * as R from 'constants/RouteConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { AdminContainer, AdminContentContainer } from 'style/Admin.style'

interface IAdminProps {}

const Admin: React.FC<IAdminProps> = () => {
    const router = useRouter()
    React.useEffect(() => {
        if (
            router.query.menu !== R.ROUTE_ITEMS.adminCities &&
            router.query.menu !== R.ROUTE_ITEMS.adminFlaggedContent &&
            router.query.menu !== R.ROUTE_ITEMS.adminRecommendationLists
        ) {
            router.push(
                `${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminCities}`,
                // `${R.ROUTE_ITEMS.admin}/${R.ROUTE_ITEMS.adminCities}`,
                undefined,
                {
                    shallow: true,
                }
            )
        }
    }, [])

    return (
        <AdminContainer>
            <AdminMenu />
            <AdminContentContainer>
                {router.query.menu === R.ROUTE_ITEMS.adminCities ? (
                    <AdminCities />
                ) : router.query.menu === R.ROUTE_ITEMS.adminFlaggedContent ? (
                    <AdminFlaggedContent />
                ) : router.query.menu === R.ROUTE_ITEMS.adminRecommendationLists ? (
                    <AdminRecommendationLists />
                ) : null}
            </AdminContentContainer>
        </AdminContainer>
    )
}

export default Admin
