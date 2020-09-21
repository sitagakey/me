import React from 'react';
import styles from '@/styles/components/layout/_Container.module.scss';

class Container extends React.Component {
    render() {
        return (
            <div className={styles['cmp_container'] + (this.props.spFull ? ` ${styles['is-sp-full']}` : '')}>
                {this.props.children}
            </div>
        );
    }
}

export default Container;