import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/list/_ArticleLinkList.module.scss';

class ArticleLinkList extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className={styles['cmp_article-link-list']}>
                <p className={styles['cmp_article-link-list_hdg']}>{this.props.label}</p>
                <ul className={styles['cmp_article-link-list_list']}>
                    {this.props.postDataArr.map((postData) => (
                        <li className={styles['cmp_article-link-list_list-item']} key={postData.filePathWithoutExt}>
                            <Link href='/post/[year]/[month]/[name]' as={postData.filePathWithoutExt}>
                                <a>{postData.title}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default ArticleLinkList;