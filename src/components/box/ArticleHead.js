import React from 'react';
import styles from '@/styles/components/box/_ArticleHead.module.scss';

class ArticleHead extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const date = (() => {
            const dateObj = new Date(this.props.articleData.createdAt);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');;
            const date = String(dateObj.getDate()).padStart(2, '0');
            const hour = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');

            return `${year}/${month}/${date} - ${hour}:${minutes}`;
        })();

        return (
            <div className={styles['cmp_article-head']}>
                <p className={styles['cmp_article-head_date']}>{date}</p>
                <h1 className={styles['cmp_article-head_hdg']}>{this.props.articleData.title}</h1>
                <ul className={styles['cmp_article-head_tag-list']}>
                    {this.props.articleData.tags.map(tag => (
                        <li key={tag.id} className={styles['cmp_article-head_tag-list-item']}>{tag.name}</li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ArticleHead;