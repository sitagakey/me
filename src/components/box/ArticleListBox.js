import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/box/_ArticleListBox.module.scss';

class ArticleListBox extends React.Component {
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
        const HdgType = this.props.hdgType;
        const url = this.props.articleData.thumbnail ? this.props.articleData.thumbnail.url : '';

        return (
            <div className={styles['cmp_article-list-box']}>
                <div className={styles['cmp_article-list-box_content']}>
                    <p className={styles['cmp_article-list-box_date']}>{date}</p>
                    <Link href="/blog/post/[id]" as={`/blog/post/${this.props.articleData.id}`} >
                        <a className={styles['cmp_article-list-box_link']}>
                            <HdgType>{this.props.articleData.title}</HdgType>
                        </a>
                    </Link>
                    <ul className={styles['cmp_article-list-box_tag-list']}>
                        {this.props.articleData.tags.map(tag => (
                            <React.Fragment key={tag.id}>
                            <li className={styles['cmp_article-list-box_tag-list-item']}>{tag.name}</li>
                            </React.Fragment>
                        ))}
                    </ul>
                </div>
                <Link href="/blog/post/[id]" as={`/blog/post/${this.props.articleData.id}`} >
                    <a className={styles['cmp_article-list-box_thumbnail']} data-msg={url ? '' : 'サムネイルなし'}>
                        {
                            url && <img src={url} alt="" />
                        }
                    </a>
                </Link>
            </div>
        );
    }
}

export default ArticleListBox;