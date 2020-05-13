import { StylesProvider } from '@material-ui/core/styles'
import { addDecorator, addParameters } from '@storybook/react'
import { SnackbarProvider } from 'notistack'
import { Provider as StoreProvider } from 'react-redux'
import { viewportDevices } from 'style/device'
import { GlobalStyle } from 'style/GlobalStyle'
import { ThemeProvider } from 'styled-components'
import store from '../src/store/index'
import { theme } from '../src/style/theme'

let viewports = {}
Object.entries(viewportDevices).map((entry) => {
    const key = entry[0]
    const value = entry[1]

    viewports = {
        ...viewports,
        [key]: {
            name: key,
            styles: { width: value.width, height: value.height },
        },
    }
})

addParameters({
    viewport: {
        viewports: viewports, 
        defaultViewport: 'laptop',
    },
})
addDecorator((s) => (
    <>
        <StoreProvider store={store}>
            <StylesProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap" rel="stylesheet"
                    />
                    <SnackbarProvider maxSnack={3}>
                    <GlobalStyle />
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            {s()}
                        </div>
                    </SnackbarProvider>
                </ThemeProvider>
            </StylesProvider>
        </StoreProvider>
    </>
))