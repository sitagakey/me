import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import ArticleHead from '@/components/box/ArticleHead';
import ArticleThumbnail from '@/components/box/ArticleThumbnail';
import ArticleBody from '@/components/box/ArticleBody';
import LinkBtnBox from '@/components/box/LinkBtnBox';
import ArticleLinkList from '@/components/list/ArticleLinkList';
import ShareList from '@/components/list/ShareList';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { getPostDataArr, PostData } from '@/lib/utils';
import { useEffect } from 'react';

type Props = {
    postData: PostData;
    postDataArrOfLatest5: PostData[];
    postDataArrOfLatest5WithTag: {
        tag: string;
        postDataArr: PostData[];
    }[];
};

const Article: React.VFC<Props> = (props) => {
    const description = (() => {
        const { year, month, date } = props.postData.date;

        return `ひきるーむの${year}年${month}月${date}日に公開された記事、「${props.postData.title}」です。`;
    })();
    const jsonLd = (() => {
        const headLine = props.postData.title;
        const datePublished = (() => {
            const { year, month, date, hour, minutes, seconds } = props.postData.date;

            return `${year}${month}${date}T${hour}${minutes}${seconds}+0900`;
        })();
        const dateModified = (() => {
            const { year, month, date, hour, minutes, seconds } = props.postData.update;

            return `${year}${month}${date}T${hour}${minutes}${seconds}+0900`;
        })();

        return JSON.stringify({
            '@context': 'http://schema.org',
            '@type': 'BlogPosting',
            'datePublished': datePublished,
            'dateModified': dateModified,
            'headline': headLine,
        });
    })();

    useEffect(() => {
        import('twitter-like-image');
    });

    return (
        <Layout title={`${props.postData.title}`} description={description}>
            <Head>
                <meta property="og:site_name" content="ひきるーむ" />
                <meta property="og:description" content={description} />
                <meta property="og:title" content={`${props.postData.title} | ひきるーむ`} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={`https://hikiroom.site${props.postData.filePathWithoutExt}`} />
                <meta property="og:image" content={props.postData.thumbnail ? `https://hikiroom.site${props.postData.thumbnail}` : 'https://hikiroom.site/images/ogp.png'} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@hikiroom" />
                <script type="application/ld+json" dangerouslySetInnerHTML={{__html: jsonLd}}></script>
            </Head>
            <Container>
                <ArticleHead postData={props.postData} />
            </Container>
            <ArticleThumbnail src={props.postData.thumbnail} />
            <Container>
                <Container spFull={true}>
                    <Container spFull={true}>
                        <Container spFull={true}>
                            <ArticleBody mdText={props.postData.body} />
                            <ShareList url={`https://hikiroom.site${props.postData.filePathWithoutExt}`} title={props.postData.title} />
                            {props.postDataArrOfLatest5WithTag.map((postDataArrWithTag) => (
                                <ArticleLinkList label={`${postDataArrWithTag.tag}タグのついた最新のチラ裏`} postDataArr={postDataArrWithTag.postDataArr} key={postDataArrWithTag.tag} />
                            ))}
                            <ArticleLinkList label={'最新のチラ裏'} postDataArr={props.postDataArrOfLatest5} />
                            <LinkBtnBox href="/" label="最新のチラ裏一覧へ" />
                        </Container>
                    </Container>
                </Container>
            </Container>
        </Layout>
    );
};

type PropsContext = ParsedUrlQuery & {
    year: string;
    month: string;
    name: string;
};
type GetStaticPropsResult = {
    postData: PostData;
    postDataArrOfLatest5: PostData[];
    postDataArrOfLatest5WithTag: {
        tag: string;
        postDataArr: PostData[];
    }[];
};
export const getStaticPaths: GetStaticPaths<PropsContext> = async () => {
    const postDataArr = getPostDataArr();
    const paths = postDataArr.map((postData) => {
        return {
            params: {
                year: postData.date.year,
                month: postData.date.month,
                name: postData.fileName,
            }
        }
    });

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<GetStaticPropsResult, PropsContext> = async (context: GetStaticPropsContext<PropsContext>) => {
    const year = context?.params?.year;
    const month = context?.params?.month;
    const name = context?.params?.name;

    if (!year || !month || !name) {
        throw new Error(`do not get "year or month or name"`);
    }

    const postDataArr = getPostDataArr();
    const postData = postDataArr.find((postData) => {
        const contextPath = `/post/${year}/${month}/${name}`;

        return contextPath === postData.filePathWithoutExt;
    });
    if (!postData) {
        throw new Error(`do not exist "postData"`);
    }

    const postDataArrOfLatest5 = postDataArr.filter((_, i) => i < 5);
    const postDataArrOfLatest5WithTag = postData.tags.map((tag) => {
        const filteredPostDataArr = postDataArr.filter((postData, i) => postData.tags.includes(tag) && i < 5);

        return {
            tag,
            postDataArr: filteredPostDataArr,
        }
    });

    return {
        props : {
            postData,
            postDataArrOfLatest5,
            postDataArrOfLatest5WithTag,
        }
    };
};

export default Article;