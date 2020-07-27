import { ReactKeycloakInjectedProps, withKeycloak } from '@react-keycloak/nextjs'
import React from 'react'
import { Subtract } from 'utility-types'

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

const withAuth = <P extends IWithAuthInjectedProps>(WrappedComponent: React.ComponentType<P>) => {
    const KeycloakComponent: React.ComponentType<Subtract<P, IWithAuthInjectedProps>> = withKeycloak(
        (props: ReactKeycloakInjectedProps & P) => {
            const { keycloak, isServer, keycloakInitialized, ...passProps } = props
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
                    {...((passProps as unknown) as P)}
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
        }
    )
    return KeycloakComponent
}

export default withAuth
