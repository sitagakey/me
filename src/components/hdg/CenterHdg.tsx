import styles from '@/styles/components/hdg/_CenterHdg.module.scss';

type Props = {
    tagName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    children: React.ReactNode;
}

const CenterHdg = (props: Props) => {
    const TagName = props.tagName;

    return (
        <TagName className={styles['cmp_center-hdg']}>
            <span>{props.children}</span>
        </TagName>
    );
};

export default CenterHdg;