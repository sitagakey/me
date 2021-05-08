import styles from '@/styles/components/btn/_CircleBtn.module.scss';

type Props = {
    isActive: boolean;
    label: string;
    onClick: () => void;
}

export default function CircleBtn(props: Props) {
    return (
        <button className={styles['cmp_circle-btn'] + (props.isActive ? ` ${styles['is-active']}` : '')} type="button" onClick={props.onClick}>{props.label}</button>
    );
};