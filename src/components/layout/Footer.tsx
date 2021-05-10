import Link from 'next/link';
import { tags } from '@/lib/variables';
import styles from '@/styles/components/layout/_Footer.module.scss';

const Footer: React.VFC = () => {
    return (
        <footer className={styles['cmp_footer']}>
            <div className={styles['cmp_footer_inr']}>
                <div className={styles['cmp_footer_group']}>
                    <p　className={styles['cmp_footer_hdg']}>タグ一覧</p>
                    <div className={styles['cmp_footer_tag-list']}>
                        <ul className={styles['cmp_footer_tag-list-inr']}>
                            {tags.map((tag) => (
                                <li key={tag} className={styles['cmp_footer_tag-list-item']}>
                                    <Link href="/tags/[name]" as={`/tags/${tag}`}>
                                        <a>{tag}</a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <dl className={styles['cmp_footer_group']}>
                    <dt className={styles['cmp_footer_hdg']}>僕について</dt>
                    <dd>僕は大都会新宿でフロントエンドエンジニアをしていたひきこもりくんだよ彡(^)(^)</dd>
                </dl>
                <p className={styles['cmp_footer_copy']}><small>&copy; 2020 ひきるーむ</small></p>
            </div>
        </footer>
    );
}

export default Footer;