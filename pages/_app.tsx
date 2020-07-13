// import { CssBaseline } from '@material-ui/core'
import { KeycloakCookies } from '@react-keycloak/nextjs'
import RootApp from 'components/RootApp/RootApp'
import Provider from 'config/Provider'
import VersionInfo from 'constants/GitProperties.json'
import cookie from 'cookie'
import { IncomingMessage } from 'http'
import { AppContext, AppProps } from 'next/app'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Footer from '../src/sections/Footer/Footer'
import Header from '../src/sections/Header/Header'
import { AppContainer, PageContainer } from '../src/style/App.style'
import { GlobalStyle } from '../src/style/GlobalStyle'

interface InitialProps {
    cookies: KeycloakCookies
}

const App = ({ Component, pageProps, cookies }: AppProps & InitialProps) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
        console.log('Build Information: ', VersionInfo)
    }, [])

    return (
        <>
            <Provider cookies={cookies}>
                {/* <CssBaseline /> */}
                <GlobalStyle />
                <AppContainer>
                    <Header />
                    <PageContainer>
                        <RootApp>
                            <Component {...pageProps} />
                        </RootApp>
                    </PageContainer>
                    <Footer />
                </AppContainer>
            </Provider>
        </>
    )
}

const parseCookies = (req?: IncomingMessage) => {
    if (!req || !req.headers) {
        return {}
    }
    return cookie.parse(req.headers.cookie || '')
}

App.getInitialProps = async (context: AppContext) => {
    // Extract cookies from AppContext
    return {
        cookies: parseCookies(context?.ctx?.req),
    }
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
