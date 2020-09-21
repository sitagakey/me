import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html lang="ja">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script src="/lib/js/TLImageViewer.js" defer />
                </body>
            </Html>
        )
    }
}

export default MyDocument;