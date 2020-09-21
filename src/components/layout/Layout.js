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
                <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700&display=swap" rel="stylesheet" />
                <link href={`/lib/css/TLImageViewer.css`} rel="stylesheet" />
            </Head>
            <Header hasTitle={title !== ''} />
                {children}
            <Footer />
        </div>
    );
};

export default Layout;