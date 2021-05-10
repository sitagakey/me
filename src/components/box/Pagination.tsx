import CircleBtn from '@/components/btn/CircleBtn';
import styles from '@/styles/components/box/_Pagination.module.scss';

type Props = {
    count: number;
    index: number;
    btnClickEvent: (index: number) => void;
};

const Pagination: React.VFC<Props> = (props) => {
    const circleBtns = [];
    for (let i = 0; i < props.count; i++) {
        const isActive = props.index === i;

        circleBtns.push(
            <CircleBtn
                key={i}
                label={String(i + 1)}
                isActive={isActive}
                onClick={props.btnClickEvent.bind(null, i)}
            />
        )
    }

    return (
        <div className={styles['cmp_pagination']}>
            <div className={styles['cmp_pagination_inr']}>
                {circleBtns}
            </div>
        </div>
    );
}

export default Pagination;