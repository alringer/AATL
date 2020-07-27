import * as R from 'constants/RouteConstants'
import { useRouter } from 'next/router'
import React from 'react'
import { AdminMenuContainer, AdminMenuItem, AdminMenuTitle } from './AdminMenu.style'

interface IAdminMenu {}

const AdminMenu: React.FC<IAdminMenu> = () => {
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
            <AdminMenuTitle>Admin Menu</AdminMenuTitle>
            <AdminMenuItem id={router.query.menu === R.ROUTE_ITEMS.adminCities ? 'active' : ''} onClick={handleCities}>
                CITIES
            </AdminMenuItem>

            <AdminMenuItem
                id={router.query.menu === R.ROUTE_ITEMS.adminFlaggedContent ? 'active' : ''}
                onClick={handleFlaggedContent}
            >
                FLAGGED CONTENT (3)
            </AdminMenuItem>
            <AdminMenuItem
                id={router.query.menu === R.ROUTE_ITEMS.adminRecommendationLists ? 'active' : ''}
                onClick={handleRecommendationLists}
            >
                RECOMMENDATION LISTS
            </AdminMenuItem>
        </AdminMenuContainer>
    )
}

export default AdminMenu
