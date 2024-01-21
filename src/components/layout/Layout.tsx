import { GA_TRACKING_ID } from "@/lib/gtag";
import Head from "next/head";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

type Props = {
  title?: string;
  description?: string;
  children: React.ReactNode;
};

const Layout: React.VFC<Props> = ({
  title = "",
  description = "",
  children,
}) => {
  const mainTitle = "したがきちょう";
  const fallbackDescription =
    "Webフロントエンドエンジニアのしたがきくんが書いているチラ裏日記だよ彡(^)(^)";

  return (
    <div>
      <Head>
        <title>{title ? `${title} | ${mainTitle}` : mainTitle}</title>
        <meta
          name="description"
          content={description ? description : fallbackDescription}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@100;400;700&display=swap"
          rel="stylesheet"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments)}
                        gtag('js', new Date());
                        gtag('config', '${GA_TRACKING_ID}');
                    `,
          }}
        />
      </Head>
      <Header hasTitle={title !== ""} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
