import document, { Head, Html, Main, NextScript } from 'next/document'

class MyDocument extends document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* <link rel="preload" href="/fonts/noto-sans-v9-latin-regular.woff2" as="font" crossOrigin="" /> */}
                    <link
                        rel="preload"
                        href="https://fonts.googleapis.com/css2?family=Rubik&display=swap"
                        as="font"
                        crossOrigin=""
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default MyDocument
