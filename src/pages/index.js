import React from 'react';
import Head from 'next/head';
import {getPostDataArr, splitPostDataArr} from '@/lib/utils.js';
import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import CenterHdg from '@/components/hdg/CenterHdg';
import ArticleListBox from '@/components/box/ArticleListBox';
import Pagination from '@/components/box/Pagination';
import DescriptionText from '@/components/text/DescriptionText';

class Home extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            index: 0,
        }
    }

    changeIndex = (index) => {
        this.setState({index});
        window.scrollTo(0, 0);
    }
    render() {
        const pageNum = this.props.postDataArr.length;

        return (
            <Layout>
                <Head>
                    <meta property="og:site_name" content="ひきるーむ" />
                    <meta property="og:description" content="Webフロントエンドエンジニアのひきこもりくんが書いているチラ裏日記だよ彡(^)(^)" />
                    <meta property="og:title" content="ひきるーむ" />
                    <meta property="og:type" content="article" />
                    <meta property="og:url" content="https://hikiroom.site" />
                    <meta property="og:image" content="https://hikiroom.site/images/ogp.png" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@hikiroom" />
                </Head>
                <Container>
                    <DescriptionText>ここは僕のチラ裏だよ彡(^)(^)<br />文句は100000000年ロムってからしてくれな</DescriptionText>
                        <CenterHdg tagName="h2">最新のチラ裏</CenterHdg>
                        {this.props.postDataArr[this.state.index].map(postData => (
                            <ArticleListBox hdgType="h3" postData={postData} key={postData.filePathWithoutExt}/>
                        ))}
                        <Pagination index={this.state.index} count={pageNum} btnClickEvent={this.changeIndex}/>
                </Container>
            </Layout>
        );
    }
};

export const getStaticProps = async () => {
    return {
        props: {
            postDataArr: splitPostDataArr(getPostDataArr()),
        }
    };
};

export default Home;