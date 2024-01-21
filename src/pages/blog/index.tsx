import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Container from "@/components/layout/Container";
import CenterHdg from "@/components/hdg/CenterHdg";
import ArticleListBox from "@/components/box/ArticleListBox";
import Pagination from "@/components/box/Pagination";
import DescriptionText from "@/components/text/DescriptionText";
import { useState } from "react";
import { GetStaticProps } from "next";
import { PostData, getPostDataArr, splitPostDataArr } from "@/lib/utils";

type Props = {
  splitPostDataArr: PostData[][];
};

const Home: React.VFC<Props> = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const changePageIndex = (index: number) => {
    setPageIndex(index);
    window.scrollTo(0, 0);
  };
  const pageNum = props.splitPostDataArr.length;

  return (
    <Layout>
      <Head>
        <meta property="og:site_name" content="したがきちょう" />
        <meta
          property="og:description"
          content="Webフロントエンドエンジニアのしたがきくんが書いているチラ裏日記だよ彡(^)(^)"
        />
        <meta property="og:title" content="したがきちょう" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://hikiroom.site" />
        <meta
          property="og:image"
          content="https://hikiroom.site/images/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@hikiroom" />
      </Head>
      <Container>
        <DescriptionText>
          ここは僕のチラ裏だよ彡(^)(^)
          <br />
          文句は100000000年ロムってからしてくれな
        </DescriptionText>
        <CenterHdg tagName="h2">最新のチラ裏</CenterHdg>
        {props.splitPostDataArr[pageIndex].map((postData: PostData) => (
          <ArticleListBox
            hdgType="h3"
            postData={postData}
            key={postData.filePathWithoutExt}
          />
        ))}
        <Pagination
          index={pageIndex}
          count={pageNum}
          btnClickEvent={changePageIndex}
        />
      </Container>
    </Layout>
  );
};

type GetStaticPropsResult = {
  splitPostDataArr: PostData[][];
};
export const getStaticProps: GetStaticProps<
  GetStaticPropsResult
> = async () => {
  return {
    props: {
      splitPostDataArr: splitPostDataArr(getPostDataArr()),
    },
  };
};

export default Home;
