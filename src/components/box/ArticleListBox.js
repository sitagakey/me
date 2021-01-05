import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/box/_ArticleListBox.module.scss';

class ArticleListBox extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const HdgType = this.props.hdgType;
        const url = this.props.postData.thumbnail;

        return (
            <div className={styles['cmp_article-list-box']}>
                <div className={styles['cmp_article-list-box_content']}>
                    <p className={styles['cmp_article-list-box_date']}>{this.props.postData.date.str}</p>
                    <Link href="/post/[year]/[month]/[name]" as={this.props.postData.filePathWithoutExt}>
                        <a className={styles['cmp_article-list-box_link']}>
                            <HdgType>{this.props.postData.title}</HdgType>
                        </a>
                    </Link>
                    <div className={styles['cmp_article-list-box_tag-list']}>
                        <ul className={styles['cmp_article-list-box_tag-list-inr']}>
                            {this.props.postData.tags.map((tag) => (
                                <li className={styles['cmp_article-list-box_tag-list-item']} key={tag}>
                                    <Link href="/tags/[name]" as={`/tags/${tag}`}>
                                        <a>{tag}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <Link href="/post/[year]/[month]/[name]" as={this.props.postData.filePathWithoutExt}>
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