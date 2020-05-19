// import { CssBaseline } from '@material-ui/core'
import Provider from 'config/Provider'
import { AppProps } from 'next/app'
import React from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Footer from '../src/sections/Footer/Footer'
import Header from '../src/sections/Header/Header'
import { GlobalStyle } from '../src/style/GlobalStyle'
import { AppContainer, PageContainer } from './style/App.style'

const App = ({ Component, pageProps }: AppProps) => {
    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
            <Provider>
                {/* <CssBaseline /> */}
                <GlobalStyle />
                <AppContainer>
                    <Header />
                    <PageContainer>
                        <Component {...pageProps} />
                    </PageContainer>
                    <Footer />
                </AppContainer>
            </Provider>
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
