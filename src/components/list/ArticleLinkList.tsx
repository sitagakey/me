import Link from 'next/link';
import { PostData } from '@/lib/utils';
import styles from '@/styles/components/list/_ArticleLinkList.module.scss';

type Props = {
    label: string;
    postDataArr: PostData[];
};

const ArticleLinkList = (props: Props) => {
    return (
        <div className={styles['cmp_article-link-list']}>
            <p className={styles['cmp_article-link-list_hdg']}>{props.label}</p>
            <ul className={styles['cmp_article-link-list_list']}>
                {props.postDataArr.map((postData) => (
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

export default ArticleLinkList;