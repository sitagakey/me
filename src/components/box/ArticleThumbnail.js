import React from 'react';
import styles from '@/styles/components/box/_ArticleThumbnail.module.scss';

class ArticleThumbnail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['cmp_article-thumbnail']} data-msg={this.props.src ? '' : 'サムネイルなし'}>
                {this.props.src && <img className={styles['cmp_article-thumbnail_bg']} src={this.props.src}/>}
                {this.props.src && <img className={styles['cmp_article-thumbnail_img']} src={this.props.src}/>}
            </div>
        );
    }
}

export default ArticleThumbnail;