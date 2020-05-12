import { StylesProvider } from '@material-ui/core/styles'
import ModalWrapper from 'components/ModalWrapper/ModalWrapper'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import store from 'store/index'
import { theme } from 'style/theme'
import { ThemeProvider } from 'styled-components'

const Provider = ({ children }) => {
    return (
        <>
            <StoreProvider store={store}>
                <StylesProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider maxSnack={3}>
                            <ModalWrapper>{children}</ModalWrapper>
                        </SnackbarProvider>
                    </ThemeProvider>
                </StylesProvider>
            </StoreProvider>
        </>
    )
}

export default Provider
