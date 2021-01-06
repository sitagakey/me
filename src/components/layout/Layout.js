import {GA_TRACKING_ID} from '@/lib/gtag';
import Head from 'next/head';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import styles from '@/styles/components/layout/_Layout.module.scss';

const Layout = ({title = '', children, layout = ''}) => {
    const mainTitle = 'ひきるーむ';

    return (
        <div className={styles['cmp_layout'] + (layout ? ` ${styles[layout]}` : '')}>
            <Head>
                <title>{title ? `${title} | ${mainTitle}` : mainTitle}</title>
                <meta name="description" content="ひきこもりくんのチラ裏" />
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700&display=swap" rel="stylesheet" />
                <link href={`/lib/css/TLImageViewer.css`} rel="stylesheet" />
                <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}></script>
                <script dangerouslySetInnerHTML={
                    {__html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments)}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}');
                    `}
                } />
            </Head>
            <Header hasTitle={title !== ''} />
                {children}
            <Footer />
        </div>
    );
};

export default Layout;