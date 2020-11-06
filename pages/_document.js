import { ServerStyleSheets as MaterialUiServerStyleSheets } from '@material-ui/styles'
import NextDocument, { Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet as StyledComponentSheets } from 'styled-components'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;700&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="apple-touch-icon" sizes="180x180" href="/favicon_package/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon_package/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon_package/favicon-16x16.png" />
                    <link rel="manifest" href="/favicon_package/site.webmanifest" />
                    <link rel="mask-icon" href="/favicon_package/safari-pinned-tab.svg" color="#5bbad5" />
                    <meta name="msapplication-TileColor" content="#da532c"></meta>
                    <meta name="theme-color" content="#ffffff"></meta>
                    <script
                        type="text/javascript"
                        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_PLACES_KEY}&libraries=places`}
                    ></script>
                    <script data-ad-client="ca-pub-5175396979081578" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

Document.getInitialProps = async (ctx) => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const styledComponentSheet = new StyledComponentSheets()
    const materialUiSheets = new MaterialUiServerStyleSheets()
    const originalRenderPage = ctx.renderPage
    try {
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App) => (props) =>
                    styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />)),
            })
        const initialProps = await NextDocument.getInitialProps(ctx)
        return {
            ...initialProps,
            styles: [
                ...React.Children.toArray(initialProps.styles),
                styledComponentSheet.getStyleElement(),
                materialUiSheets.getStyleElement(),
                //   <React.Fragment key="styles">
                //     {initialProps.styles}
                //     {materialUiSheets.getStyleElement()}
                //     {styledComponentSheet.getStyleElement()}
                //   </React.Fragment>,
            ],
        }
    } finally {
        styledComponentSheet.seal()
    }

    // const styledComponentSheet = new StyledComponentSheets()
    // const materialUiSheets = new MaterialUiServerStyleSheets()
    // const originalRenderPage = ctx.renderPage

    // ctx.renderPage = () =>
    //     originalRenderPage({
    //         enhanceApp: App => props => styledComponentSheet.collectStyles(materialUiSheets.collect(<App {...props} />))
    //     })

    // const initialProps = await NextDocument.getInitialProps(ctx)

    // return {
    //     ...initialProps,
    //     // Styles fragment is rendered after the app and page rendering finish.
    //     styles: [...React.Children.toArray(initialProps.styles), styledComponentSheet.getStyleElement(), materialUiSheets.getStyleElement()]
    // }
}
