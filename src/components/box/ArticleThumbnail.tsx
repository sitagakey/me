import styles from '@/styles/components/box/_ArticleThumbnail.module.scss';

type Props = {
    src: string;
};

const ArticleThumbnail: React.VFC<Props> = (props) => {
    return (
        <div className={styles['cmp_article-thumbnail']} data-msg={props.src ? '' : 'サムネイルなし'}>
            {props.src && <img className={styles['cmp_article-thumbnail_bg']} src={props.src}/>}
            {props.src && <img className={styles['cmp_article-thumbnail_img']} src={props.src}/>}
        </div>
    );
}

export default ArticleThumbnail;