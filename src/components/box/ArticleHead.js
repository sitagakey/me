import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/box/_ArticleHead.module.scss';

class ArticleHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const date = (() => {
            if (this.props.postData.date.str === this.props.postData.update.str) {
                return (
                    <div className={styles['cmp_article-head_date']}>
                        <p>公開日：</p>
                        <p>{this.props.postData.date.str}</p>
                    </div>
                );
            } else {
                return (
                    <>
                    <div className={styles['cmp_article-head_date']}>
                        <p>公開日：</p>
                        <p>{this.props.postData.date.str}</p>
                    </div>
                    <div className={styles['cmp_article-head_date']}>
                        <p>更新日：</p>
                        <p>{this.props.postData.update.str}</p>
                    </div>
                    </>
                );
            }
        })();

        return (
            <div className={styles['cmp_article-head']}>
                { date }
                <h1 className={styles['cmp_article-head_hdg']}>{this.props.postData.title}</h1>
                <div className={styles['cmp_article-head_tag-list']}>
                    <ul className={styles['cmp_article-head_tag-list-inr']}>
                        {this.props.postData.tags.map(tag => (
                            <li key={tag} className={styles['cmp_article-head_tag-list-item']}>
                                <Link href="/tags/[name]" as={`/tags/${tag}`}>
                                    <a>{tag}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        );
    }
}

export default ArticleHead;