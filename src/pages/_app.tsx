import '@/styles/main.scss';
import Router from 'next/router';
import { AppProps } from 'next/app';
import { pageView } from '@/lib/gtag';

Router.events.on('routeChangeComplete', (url) => pageView(url));

const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
