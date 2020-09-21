import React from 'react';
import styles from '@/styles/components/btn/_MenuBtn.module.scss';

class MenuBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button onClick={this.props.onClick()} type="button" className={styles['cmp_menu-btn'] + (this.props.isActive ? ` ${styles['is-active']}` : '')}>
                <span className={styles['cmp_menu-btn__alt']}>{this.props.isActive ? 'メニューを閉じる': 'メニューを閉じる'}</span>
            </button>
        );
    }
}

export default MenuBtn;