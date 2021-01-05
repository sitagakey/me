import {getPostDataArr} from '@/lib/utils';
import React from 'react';
import Head from 'next/head';
import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import ArticleHead from '@/components/box/ArticleHead';
import ArticleThumbnail from '@/components/box/ArticleThumbnail';
import ArticleBody from '@/components/box/ArticleBody';
import LinkBtnBox from '@/components/box/LinkBtnBox';
import ArticleLinkList from '@/components/list/ArticleLinkList';
import ShareList from '@/components/list/ShareList';

class Article extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout title={`${this.props.postData.title}`}>
                <Head>
                    <meta property="og:site_name" content="ひきるーむ" />
                    <meta property="og:description" content="ひきこもりくんのチラ裏" />
                    <meta property="og:title" content={`${this.props.postData.title} | ひきるーむ`} />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content={`https://hikiroom.site${this.props.postData.filePathWithoutExt}`} />
                    <meta property="og:image" content={this.props.postData.thumbnail ? `https://hikiroom.site${this.props.postData.thumbnail}` : 'https://hikiroom.site/images/ogp.png'} />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@hikiroom" />
                </Head>
                <Container>
                    <ArticleHead postData={this.props.postData} />
                </Container>
                <ArticleThumbnail src={this.props.postData.thumbnail} />
                <Container>
                    <Container spFull={true}>
                        <ArticleBody mdText={this.props.postData.body} />
                        <ShareList url={`https://hikiroom.site${this.props.postData.filePathWithoutExt}`}/>
                        {this.props.postDataArrOfLatest5WithTag.map((postDataArrWithTag) => (
                            <ArticleLinkList label={`${postDataArrWithTag.tag}タグのついた最新のチラ裏`} postDataArr={postDataArrWithTag.postDataArr} key={postDataArrWithTag.tag}/>
                        ))}
                        <ArticleLinkList label={'最新のチラ裏'} postDataArr={this.props.postDataArrOfLatest5}/>
                        <LinkBtnBox href="/" label="最新のチラ裏一覧へ"/>
                    </Container>
                </Container>
            </Layout>
        );
    }
};

export const getStaticPaths = async () => {
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

export const getStaticProps = async (context) => {
    const postDataArr = getPostDataArr();
    const postData = postDataArr.find((postData) => {
        const contextPath = `/post/${context.params.year}/${context.params.month}/${context.params.name}`;

        return contextPath === postData.filePathWithoutExt;
    });
    const postDataArrOfLatest5 = postDataArr.filter((_postData, i) => i < 5);
    const postDataArrOfLatest5WithTag = postData.tags.map((tag) => {
        let len = 0;
        const filteredPostDataArr = postDataArr.filter((postData) => {
            if (postData.tags.includes(tag) && len < 5) {
                len++;
                return true;
            }
        });

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