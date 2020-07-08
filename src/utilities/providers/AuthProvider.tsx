import { ReactKeycloakInjectedProps, withKeycloak } from '@react-keycloak/nextjs'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import authStore from 'store/authentication/authentication_reducer'
import { SET_KEYCLOAK } from 'store/authentication/authentication_types'
import { IUserInformation } from 'store/user/user_types'
import { login, logout } from '../../store/user/user_actions'
export interface IWithAuthInjectedProps {
    keycloakLogin: () => void
    keycloakLogout: () => void
    keycloakSignUp: () => void
    authenticated: boolean
}
interface IReduxProps {
    login: (userInformation: IUserInformation) => void
    logout: () => void
}
interface IAuthProviderProps extends IReduxProps, IWithAuthInjectedProps, ReactKeycloakInjectedProps {
    children: React.ReactChildren[]
}
const AuthProvider = withKeycloak(({ keycloak, children, login, authenticated }: IAuthProviderProps) => {
    const [keycloakInstance, setKeycloakInstance] = React.useState(null)

    React.useEffect(() => {
        setKeycloakInstance(keycloak)
        authStore.dispatch({ type: SET_KEYCLOAK, payload: keycloak })
    }, [])

    React.useEffect(() => {
        if (authenticated) {
            // TODO: Get the AATL user information and set it to redux
            login({ userName: 'Jane Doe', userEmail: 'example@domain.com' })
        }
    }, [authenticated])
    return <>{children}</>
})

export const withAuth = (WrappedComponent) => {
    const mapDispatchToProps = (dispatch: any) =>
        bindActionCreators(
            {
                login,
                logout,
            },
            dispatch
        )
    return reduxConnect(
        null,
        mapDispatchToProps
    )(
        withKeycloak((props) => {
            const { keycloak } = props
            const handleLogin = () => {
                if (keycloak) {
                    keycloak.login()
                } else {
                    console.log('Keycloak not available')
                }
            }
            const handleLogout = () => {
                if (keycloak) {
                    keycloak.logout()
                } else {
                    console.log('Keycloak not available')
                }
            }
            const handleSignUp = () => {
                if (keycloak) {
                    keycloak.register()
                } else {
                    console.log('Keycloak not available')
                }
            }

            return (
                <WrappedComponent
                    {...props}
                    keycloakLogin={handleLogin}
                    keycloakLogout={handleLogout}
                    keycloakSignUp={handleSignUp}
                    authenticated={keycloak.authenticated}
                />
            )
        })
    )
}

const mapDispatchToProps = (dispatch: any) =>
    bindActionCreators(
        {
            login,
            logout,
        },
        dispatch
    )

export default reduxConnect(null, mapDispatchToProps)(AuthProvider)
