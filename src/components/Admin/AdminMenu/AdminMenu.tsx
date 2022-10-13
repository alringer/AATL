import * as R from 'constants/RouteConstants'
import * as S from 'constants/StringConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { adminViewEnum } from 'utilities/types/enumerations'
import { AdminMenuContainer, AdminMenuItem, AdminMenuTitle } from './AdminMenu.style'

interface IAdminMenu {
    currentView: adminViewEnum
    countCities: number | null
    countFlagged: number | null
    countRecommendationLists: number | null
}

const AdminMenu: React.FC<IAdminMenu> = ({ currentView, countCities, countFlagged, countRecommendationLists }) => {
    const router = useRouter()

    const handleCities = () => {
        router.push(`${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminCities}`, undefined, {
            shallow: true,
        })
    }
    const handleFlaggedContent = () => {
        router.push(`${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminFlaggedContent}`, undefined, {
            shallow: true,
        })
    }
    const handleRecommendationLists = () => {
        router.push(`${R.ROUTE_ITEMS.admin}?menu=${R.ROUTE_ITEMS.adminRecommendationLists}`, undefined, {
            shallow: true,
        })
    }

    return (
        <AdminMenuContainer>
            <AdminMenuTitle>{S.ADMIN_PAGE.AdminMenu.AdminMenu}</AdminMenuTitle>
            <AdminMenuItem id={currentView === adminViewEnum.Cities ? 'active' : ''} onClick={handleCities}>
                {S.ADMIN_PAGE.AdminMenu.Cities} {countCities ? `(${countCities})` : ''}
            </AdminMenuItem>

            <AdminMenuItem
                id={currentView === adminViewEnum.FlaggedContent ? 'active' : ''}
                onClick={handleFlaggedContent}
            >
                {S.ADMIN_PAGE.AdminMenu.FlaggedContent} {countFlagged ? `(${countFlagged})` : ''}
            </AdminMenuItem>
            <AdminMenuItem
                id={currentView === adminViewEnum.RecommendationLists ? 'active' : ''}
                onClick={handleRecommendationLists}
            >
                {S.ADMIN_PAGE.AdminMenu.RecommendationLists}{' '}
                {countRecommendationLists ? `(${countRecommendationLists})` : ''}
            </AdminMenuItem>
        </AdminMenuContainer>
    )
}

export default AdminMenu
