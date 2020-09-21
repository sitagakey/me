import React from 'react';
import styles from '@/styles/components/btn/_CircleBtn.module.scss';

class CircleBtn extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <button className={styles['cmp_circle-btn'] + (this.props.isActive ? ` ${styles['is-active']}` : '')} type="button" onClick={this.props.onClick}>{this.props.label}</button>
        );
    }
}

export default CircleBtn;