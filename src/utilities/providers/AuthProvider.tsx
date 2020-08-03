import { ReactKeycloakInjectedProps, withKeycloak } from '@react-keycloak/nextjs'
import axios, { FETCH_CURRENT_USER_PROFILE } from 'config/AxiosConfig'
import jwt from 'jwt-decode'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import authStore from 'store/authentication/authentication_reducer'
import { SET_KEYCLOAK } from 'store/authentication/authentication_types'
import { login, logout } from 'store/user/user_actions'
import { IUserInformation } from 'store/user/user_types'
import { UserRoleEnum } from 'utilities/types/clientDTOS/UserRole'
import { IUserProfile } from 'utilities/types/userProfile'
interface IReduxProps {
    login: (userInformation: IUserInformation) => void
    logout: () => void
    loggedIn: boolean
}
interface IAuthProviderProps extends IReduxProps, ReactKeycloakInjectedProps {
    children: React.ReactChildren[]
}
const AuthProvider = withKeycloak(({ keycloak, children, login, logout, loggedIn }: IAuthProviderProps) => {
    React.useEffect(() => {
        authStore.dispatch({ type: SET_KEYCLOAK, payload: keycloak })
        if (keycloak.authenticated === true && loggedIn === false) {
            const decodedToken = jwt(keycloak.token)
            const roles = decodedToken.roles
            const role = roles.includes(UserRoleEnum.Admin)
                ? UserRoleEnum.Admin
                : roles.includes(UserRoleEnum.User)
                ? UserRoleEnum.User
                : null
            const config = {
                headers: {
                    Authorization: `Bearer ${keycloak.token}`,
                },
            }
            if (decodedToken && role) {
                axios
                    .get(FETCH_CURRENT_USER_PROFILE, config)
                    .then((res) => {
                        // TODO: Set User Profile information to redux
                        const userProfileInformation: IUserProfile = res.data
                        login({
                            user: userProfileInformation,
                            userRole: role,
                        })
                        console.log('User Profile Results: ', res.data)
                    })
                    .catch((err) => console.log(err))
            }
        } else if (keycloak.authenticated === false && loggedIn === true) {
            logout()
        }
    }, [keycloak])

    return <>{children}</>
})

const mapStateToProps = (state: StoreState) => ({
    loggedIn: state.userReducer.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ login, logout }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(AuthProvider)
