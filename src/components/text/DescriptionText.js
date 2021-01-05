import React from 'react';
import styles from '@/styles/components/text/_DescriptionText.module.scss';

class DescriptionText extends React.Component {
    render () {
        return (
            <p className={styles['cmp_description-text']}>{this.props.children}</p>
        );
    }
}

export default DescriptionText;