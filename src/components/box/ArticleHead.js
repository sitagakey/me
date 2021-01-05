import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/box/_ArticleHead.module.scss';

class ArticleHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['cmp_article-head']}>
                <p className={styles['cmp_article-head_date']}>{this.props.postData.date.str}</p>
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