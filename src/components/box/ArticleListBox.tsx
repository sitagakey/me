import Link from 'next/link';
import { PostData } from '@/lib/utils';
import styles from '@/styles/components/box/_ArticleListBox.module.scss';

type Props = {
    hdgType: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    postData: PostData;
};

const ArticleListBox = (props: Props) => {
    const HdgType = props.hdgType;
    const url = props.postData.thumbnail;

    return (
        <div className={styles['cmp_article-list-box']}>
            <div className={styles['cmp_article-list-box_content']}>
                <p className={styles['cmp_article-list-box_date']}>{props.postData.date.str}</p>
                <Link href="/post/[year]/[month]/[name]" as={props.postData.filePathWithoutExt}>
                    <a className={styles['cmp_article-list-box_link']}>
                        <HdgType>{props.postData.title}</HdgType>
                    </a>
                </Link>
                <div className={styles['cmp_article-list-box_tag-list']}>
                    <ul className={styles['cmp_article-list-box_tag-list-inr']}>
                        {props.postData.tags.map((tag) => (
                            <li className={styles['cmp_article-list-box_tag-list-item']} key={tag}>
                                <Link href="/tags/[name]" as={`/tags/${tag}`}>
                                    <a>{tag}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Link href="/post/[year]/[month]/[name]" as={props.postData.filePathWithoutExt}>
                <a className={styles['cmp_article-list-box_thumbnail']} data-msg={url ? '' : 'サムネイルなし'}>
                    {
                        url && <img src={url} alt="" />
                    }
                </a>
            </Link>
        </div>
    );
}

export default ArticleListBox;