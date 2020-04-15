import { StylesProvider } from '@material-ui/core/styles'
import { addDecorator, addParameters } from '@storybook/react'
import { viewportDevices } from 'style/device'
import { GlobalStyle } from 'style/GlobalStyle'
import { ThemeProvider } from 'styled-components'
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
        <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '-webkit-fill-available',
                    }}
                >
                    {s()}
                </div>
            </ThemeProvider>
        </StylesProvider>
    </>
))