import React from 'react';
import styles from '@/styles/components/box/_Pagination.module.scss';
import CircleBtn from '@/components/btn/CircleBtn';

class Pagination extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        const circleBtns = [];
        
        for (let i = 0; i < this.props.count; i++) {
            const isActctive = this.props.index === i;

            circleBtns.push(<CircleBtn key={i} label={i + 1} isActive={isActctive} onClick={this.props.btnClickEvent.bind(null, i)}/>)
        }

        return (
            <div className={styles['cmp_pagination']}>
                <div className={styles['cmp_pagination__inr']}>
                    {circleBtns}
                </div>
            </div>
        );
    }
}

export default Pagination;