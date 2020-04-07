// import { CssBaseline } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Header from '../sections/Header/Header'
import store from '../store/index'
import { GlobalStyle } from '../style/GlobalStyle'
import { theme } from '../style/theme'

const App = ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
        ;``
    }, [])

    return (
        <>
            <StoreProvider store={store}>
                <StylesProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        {/* <CssBaseline /> */}
                        <GlobalStyle />
                        <Header />
                        <Component {...pageProps} />
                    </ThemeProvider>
                </StylesProvider>
            </StoreProvider>
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default App
