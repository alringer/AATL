import { withKeycloak } from '@react-keycloak/nextjs'
import React from 'react'
import { connect as reduxConnect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, logout } from 'store/user/user_actions'

export interface IWithAuthInjectedProps {
    keycloakLogin: () => void
    keycloakLogout: () => void
    keycloakSignUp: () => void
    token: any
    authenticated: boolean
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
                    token={keycloak.token}
                />
            )
        })
    )
}

export default withAuth
