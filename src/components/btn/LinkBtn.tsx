import Link from 'next/link';
import styles from '@/styles/components/btn/_LinkBtn.module.scss';

type Props = {
    href: string;
    children: React.ReactNode;
}

const LinkBtn = (props: Props) =>  {
    return (
        <Link href={props.href}>
            <a className={styles['cmp_link-btn']}>
                {props.children}
            </a>
        </Link>
    );
};

export default LinkBtn;