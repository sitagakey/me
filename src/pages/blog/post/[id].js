import fetch from 'isomorphic-unfetch';
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import ArticleHead from '@/components/box/ArticleHead';
import ArticleThumbnail from '@/components/box/ArticleThumbnail';
import ArticleBody from '@/components/box/ArticleBody';
import LinkBtnBox from '@/components/box/LinkBtnBox';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const thumbnail = this.props.blog.thumbnail ? this.props.blog.thumbnail.url : '';

        return (
            <Layout title={`${this.props.blog.title} | チラ裏`}>
                <Head>
                    <meta property="og:site_name" content="ひきるーむ" />
                    <meta property="og:description" content="ひきこもりくんのチラ裏" />
                    <meta property="og:title" content={`${this.props.blog.title} | チラ裏 | ひきるーむ`} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://hikiroom.site" />
                    <meta property="og:image" content={this.props.blog.thumbnail ? this.props.blog.thumbnail.url : ''} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@hikiroom" />
                    <script defer src="https://platform.twitter.com/widgets.js"></script>
                </Head>
                <Container>
                    <ArticleHead articleData={this.props.blog} />
                </Container>
                <ArticleThumbnail src={thumbnail} />
                <Container>
                    <Container spFull={true}>
                        <ArticleBody mdText={this.props.blog.body} />
                        <LinkBtnBox href="/blog" label="チラ裏一覧へ戻る"/>

                        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="true">Tweet</a>
                    </Container>
                </Container>
            </Layout>
        );
    }
};

export const getStaticPaths = async () => {
    const getArticleDataList = async () => {
        let offset = 0;
        const val = [];
        
        const getArticleData = async (offset) => {
            const option = {
                headers: {'X-API-KEY': process.env.API_KEY},
            };
            const res = await fetch(`https://hikiroom.microcms.io/api/v1/blogs/?offset=${offset}`, option);
            const data = await res.json();
        
            return data;
        };
        const loop = async () => {
            const articleData = await getArticleData(offset);
            const {totalCount, limit, contents} = articleData;

            val.push(contents);

            offset += limit;

            if (totalCount > offset) {
                await loop();
            }
        }

        await loop();

        return val;
    };
    const articleDataList = await getArticleDataList();
    const paths = articleDataList.flat().map(articleData => `/blog/post/${articleData.id}`);

    return {paths, fallback: false};
};

export const getStaticProps = async context => {
    const id = context.params.id;
    const key = {
        headers: {'X-API-KEY': process.env.API_KEY},
    };

    const res = await fetch(
        `https://hikiroom.microcms.io/api/v1/blogs/${id}`,
        key,
    );
    const blog = await res.json();

    return {
        props : {
            blog: blog,
        }
    };
};

export default Article;