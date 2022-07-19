import { StylesProvider } from '@material-ui/core/styles'
import { Persistors, SSRKeycloakProvider } from '@react-keycloak/nextjs'
import ModalProvider from 'components/ModalProvider/ModalProvider'
import keycloakCfg from 'config/KeycloakConfig'
import { SnackbarUtilsConfigurator } from 'config/SnackbarUtils'
import { SnackbarProvider } from 'notistack'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
            <SSRKeycloakProvider
                keycloakConfig={keycloakCfg}
                persistor={Persistors.Cookies(cookies)}
                LoadingComponent={<div></div>}
                autoRefreshToken={true}
            >
                <StoreProvider store={store}>
                    <AuthProvider>
                        <StylesProvider injectFirst>
                            <ThemeProvider theme={theme}>
                                <SnackbarProvider maxSnack={3}>
                                    <SnackbarUtilsConfigurator />
                                    <DndProvider backend={HTML5Backend}>
                                        <ModalProvider>{children}</ModalProvider>
                                    </DndProvider>
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
