
import React from 'react';
import Layout from '@/components/layout/Layout';
import Container from '@/components/layout/Container';
import CenterHdg from '@/components/hdg/CenterHdg';
import ArticleListBox from '@/components/box/ArticleListBox';
import Pagination from '@/components/box/Pagination';

class BlogIndex extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            index: 0,
            articleDataList: props.articleDataList
        }
    }

    changeIndex = (index) => {
        this.setState({index});
        window.scrollTo(0, 0);
    }
    render() {
        const pageNum = this.state.articleDataList.length;

        return (
            <Layout title="チラ裏">
                <Container>
                    <h1>チラ裏</h1>
                    <p>ここはチラ裏や！文句は100000000年ロムってからしてくれな彡(^)(^)</p>
                    <Container spFull={true}>
                        <CenterHdg tagName="h2">最新のチラ裏</CenterHdg>
                        <div>
                            {this.state.articleDataList[this.state.index].map(articleData => (
                                <ArticleListBox hdgType="h3" articleData={articleData} key={articleData.id}/>
                            ))}
                        </div>
                        <Pagination index={this.state.index} count={pageNum} btnClickEvent={this.changeIndex}/>
                    </Container>
                </Container>
            </Layout>
        );
    }
};

export const getStaticProps = async () => {
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

    return {
        props: {
            articleDataList,
        }
    }
};

export default BlogIndex;