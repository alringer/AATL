import { ReactKeycloakInjectedProps, withKeycloak } from '@react-keycloak/nextjs'
import React from 'react'
import authStore from 'store/authentication/authentication_reducer'
import { SET_KEYCLOAK } from 'store/authentication/authentication_types'
import { IUserInformation } from 'store/user/user_types'
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
    React.useEffect(() => {
        authStore.dispatch({ type: SET_KEYCLOAK, payload: keycloak })
        if (authenticated) {
            // TODO: Get the AATL user information and set it to redux
            login({ userName: 'Jane Doe', userEmail: 'example@domain.com' })
        }
    }, [])

    return <>{children}</>
})

export default AuthProvider
