import { KeycloakInstance } from 'keycloak-js'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { StoreState } from 'store'
import authStore from 'store/authentication/authentication_reducer'
import { SET_KEYCLOAK } from 'store/authentication/authentication_types'
import { fetchUser, login, logout } from 'store/user/user_actions'
import withAuth, { IWithAuthInjectedProps } from 'utilities/hocs/withAuth'
interface IReduxProps {
    logout: () => void
    fetchUser: (keycloak: KeycloakInstance) => void
    loggedIn: boolean
}
interface IAuthProviderProps extends IReduxProps, IWithAuthInjectedProps {
    children: React.ReactChildren[]
}
const AuthProvider = ({ keycloak, children, logout, loggedIn, fetchUser }: IAuthProviderProps) => {
    React.useEffect(() => {
        authStore.dispatch({ type: SET_KEYCLOAK, payload: keycloak })
        if (keycloak.authenticated === true && loggedIn === false) {
            fetchUser(keycloak)
        } else if (keycloak.authenticated === false && loggedIn === true) {
            logout()
        }
    }, [keycloak])

    return <>{children}</>
}

const mapStateToProps = (state: StoreState) => ({
    loggedIn: state.userReducer.loggedIn,
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ login, logout, fetchUser }, dispatch)
export default reduxConnect(mapStateToProps, mapDispatchToProps)(withAuth(AuthProvider))
