import styles from '@/styles/components/text/_DescriptionText.module.scss';

type Props = {
    children: React.ReactNode;
}

const DescriptionText = (props: Props) => {
    return (
        <p className={styles['cmp_description-text']}>{props.children}</p>
    );
}

export default DescriptionText;