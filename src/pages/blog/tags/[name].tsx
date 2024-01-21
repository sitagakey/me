import Head from "next/head";
import Layout from "@/components/layout/Layout";
import Container from "@/components/layout/Container";
import CenterHdg from "@/components/hdg/CenterHdg";
import ArticleListBox from "@/components/box/ArticleListBox";
import Pagination from "@/components/box/Pagination";
import DescriptionText from "@/components/text/DescriptionText";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
import { useState } from "react";
import { tags } from "@/lib/variables";
import { PostData, getPostDataArr, splitPostDataArr } from "@/lib/utils";

type Props = {
  tagName: string;
  splitPostDataArr: PostData[][];
};

const TagPage: React.VFC<Props> = (props) => {
  const [pageIndex, setPageIndex] = useState(0);
  const changeIndex = (index: number) => {
    setPageIndex(index);
    window.scrollTo(0, 0);
  };
  const pageNum = props.splitPostDataArr.length;

  return (
    <Layout title={`タグ：${props.tagName}`}>
      <Head>
        <meta property="og:site_name" content="したがき帳" />
        <meta property="og:description" content="したがきくんのチラ裏" />
        <meta
          property="og:title"
          content={`タグ：${props.tagName} | したがき帳`}
        />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://sitagakey.me/blog/tags/${props.tagName}`}
        />
        <meta
          property="og:image"
          content="https://sitagakey.me/images/ogp.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sitagakey" />
      </Head>
      <Container>
        <DescriptionText>
          ここは僕のチラ裏だよ彡(^)(^)
          <br />
          文句は100000000年ロムってからしてくれな
        </DescriptionText>
        <CenterHdg tagName="h2">タグ：{props.tagName}</CenterHdg>
        {props.splitPostDataArr[pageIndex].map((postData) => (
          <ArticleListBox
            hdgType="h3"
            postData={postData}
            key={postData.filePathWithoutExt}
          />
        ))}
        <Pagination
          index={pageIndex}
          count={pageNum}
          btnClickEvent={changeIndex}
        />
      </Container>
    </Layout>
  );
};

type PropsContext = ParsedUrlQuery & {
  name: string;
};
type GetStaticPropsResult = {
  tagName: string;
  splitPostDataArr: PostData[][];
};
export const getStaticPaths: GetStaticPaths<PropsContext> = async () => {
  const paths = tags.map((tag) => {
    return {
      params: {
        name: tag,
      },
    };
  });

  return { paths, fallback: false };
};
export const getStaticProps: GetStaticProps<
  GetStaticPropsResult,
  PropsContext
> = async (context: GetStaticPropsContext<PropsContext>) => {
  const tagName = context?.params?.name;
  if (!tagName) {
    throw new Error('do not get "tagName"');
  }
  const postDataArr = getPostDataArr();
  const filteredPostDataArr = postDataArr.filter((postData) =>
    postData.tags.includes(tagName)
  );

  return {
    props: {
      tagName,
      splitPostDataArr: splitPostDataArr(filteredPostDataArr),
    },
  };
};

export default TagPage;
