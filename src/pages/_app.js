import '@/styles/main.scss';
import {pageView} from '@/lib/gtag';
import Router from 'next/router';

Router.events.on('routeChangeComplete', (url) => pageView(url));

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp;
