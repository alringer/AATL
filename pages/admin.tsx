import AdminCities from 'components/Admin/AdminCities/AdminCities'
import AdminFlaggedContent from 'components/Admin/AdminFlaggedContent/AdminFlaggedContent'
import AdminMenu from 'components/Admin/AdminMenu/AdminMenu'
import AdminRecommendationLists from 'components/Admin/AdminRecommendationLists/AdminRecommendationLists'
import Snackbar from 'components/Snackbar/Snackbar'
import { SnackbarMessageBody } from 'components/Snackbar/Snackbar.style'
import * as R from 'constants/RouteConstants'
import * as B from 'constants/SnackbarConstants'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { StoreState } from 'store'
import { AdminContainer, AdminContentContainer, AdminVerifyingText } from 'style/Admin.style'
import { useAuth } from 'utilities/providers/AuthProvider'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'

interface IReduxProps {
    userRole: string | null
    isLoading: boolean
}
interface IAdminProps extends IReduxProps {}

const Admin: React.FC<IAdminProps> = ({ userRole, isLoading }) => {
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { isMounted } = useAuth()

    React.useEffect(() => {
        if (isMounted === true && isLoading === false && userRole !== UserRoleEnum.Admin) {
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
    }, [userRole, isMounted, isLoading])

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

    return isMounted === true && isLoading === false && userRole === UserRoleEnum.Admin ? (
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
    ) : (
        <AdminVerifyingText>Verifying user role...</AdminVerifyingText>
    )
}

const mapStateToProps = (state: StoreState) => ({
    userRole: state.userReducer.userRole,
    isLoading: state.userReducer.isLoading,
})

export default reduxConnect(mapStateToProps)(Admin)
