import { ReactKeycloakInjectedProps, withKeycloak } from '@react-keycloak/nextjs'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout } from 'store/user/user_actions'
import { IUserInformation } from 'store/user/user_types'

export interface IWithAuthInjectedProps {
    keycloakLogin: () => void
    keycloakLogout: () => void
    keycloakSignUp: () => void
    authenticatedAction: (callback: Function) => void
    getToken: () => string
    getTokenConfig: () => string
    token: any
    authenticated: boolean
}

interface IReduxProps {
    logout: () => void
    login: (userInformation: IUserInformation) => void
}

const withAuth = (WrappedComponent) => {
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
        withKeycloak((props: ReactKeycloakInjectedProps & IReduxProps) => {
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
                    props.logout()
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
            const authenticatedAction = (callback: () => void) => {
                if (keycloak && keycloak.authenticated) {
                    callback()
                } else {
                    keycloak.login()
                }
            }
            const getToken = () => {
                if (keycloak && keycloak.token) {
                    return keycloak.token
                } else {
                    return ''
                }
            }
            const getTokenConfig = () => {
                if (keycloak && keycloak.token) {
                    return `Bearer ${keycloak.token}`
                } else {
                    return ''
                }
            }

            return (
                <WrappedComponent
                    {...props}
                    keycloakLogin={handleLogin}
                    keycloakLogout={handleLogout}
                    keycloakSignUp={handleSignUp}
                    authenticatedAction={authenticatedAction}
                    getTokenConfig={getTokenConfig}
                    getToken={getToken}
                    authenticated={keycloak.authenticated}
                    token={keycloak.token}
                />
            )
        })
    )
}

export default withAuth
