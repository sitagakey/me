import styles from '@/styles/components/layout/_Container.module.scss';

type Props = {
    spFull?: boolean;
    children: React.ReactNode;
};

const Container: React.VFC<Props> = (props) =>  {
    return (
        <div className={styles['cmp_container'] + (props.spFull ? ` ${styles['is-sp-full']}` : '')}>
            {props.children}
        </div>
    );
};

export default Container;