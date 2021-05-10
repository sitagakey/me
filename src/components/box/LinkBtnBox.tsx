import LinkBtn from '@/components/btn/LinkBtn';
import styles from '@/styles/components/box/_LinkBtnBox.module.scss';

type Props = {
    href: string;
    label: string;
};

const LinkBtnBox: React.VFC<Props> = (props) => {
    return (
        <div className={styles['cmp_link-btn-box']}>
            <LinkBtn href={props.href}>{props.label}</LinkBtn>
        </div>
    );
}

export default LinkBtnBox;