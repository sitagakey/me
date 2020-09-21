import React from 'react';
import LinkBtn from '@/components/btn/LinkBtn';
import styles from '@/styles/components/box/_LinkBtnBox.module.scss';

class LinkBtnBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['cmp_link-btn-box']}>
                <LinkBtn href={this.props.href}>{this.props.label}</LinkBtn>
            </div>
        );
    }
}

export default LinkBtnBox;