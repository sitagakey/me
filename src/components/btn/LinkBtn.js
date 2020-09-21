import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/btn/_LinkBtn.module.scss';

class LinkBtn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Link href={this.props.href}>
                <a className={styles['cmp_link-btn']}>
                    {this.props.children}
                </a>
            </Link>
        );
    }
}

export default LinkBtn;