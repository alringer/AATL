// import { CssBaseline } from '@material-ui/core'
import { StylesProvider } from '@material-ui/core/styles'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { SnackbarProvider } from 'notistack'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import Footer from '../src/sections/Footer/Footer'
import Header from '../src/sections/Header/Header'
import store from '../src/store/index'
import { GlobalStyle } from '../src/style/GlobalStyle'
import { theme } from '../src/style/theme'
import { AppContainer, PageContainer } from './style/App.style'

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter()
    React.useEffect(() => {
        console.log(router)
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <StoreProvider store={store}>
                <StylesProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <SnackbarProvider maxSnack={3}>
                            <>
                                {/* <CssBaseline /> */}
                                <GlobalStyle />
                                <AppContainer>
                                    <Header />
                                    <PageContainer>
                                        <Component {...pageProps} />
                                    </PageContainer>
                                    <Footer />
                                </AppContainer>
                            </>
                        </SnackbarProvider>
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

//   return { ...appProps }
// }

export default App
