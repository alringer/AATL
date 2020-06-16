import { StylesProvider } from '@material-ui/core/styles'
import { Persistors, SSRKeycloakProvider } from '@react-keycloak/nextjs'
import ModalProvider from 'components/ModalProvider/ModalProvider'
import keycloakCfg from 'config/KeycloakConfig'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import store from 'store/index'
import { theme } from 'style/theme'
import { ThemeProvider } from 'styled-components'
import AuthProvider from 'utilities/providers/AuthProvider'
// interface InitialProps {
//     children: ReactChildren[]
//     cookies: KeycloakCookies
// }

const Provider = ({ children, cookies }) => {
    return (
        <>
            <SSRKeycloakProvider keycloakConfig={keycloakCfg} persistor={Persistors.Cookies(cookies)}>
                <StoreProvider store={store}>
                    <AuthProvider>
                        <StylesProvider injectFirst>
                            <ThemeProvider theme={theme}>
                                <SnackbarProvider maxSnack={3}>
                                    <ModalProvider>{children}</ModalProvider>
                                </SnackbarProvider>
                            </ThemeProvider>
                        </StylesProvider>
                    </AuthProvider>
                </StoreProvider>
            </SSRKeycloakProvider>
        </>
    )
}

export default Provider
