import React from 'react';
import styles from '@/styles/components/hdg/_CenterHdg.module.scss';

class CenterHdg extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tagName: props.tagName
        };
    }

    render() {
        const TagName = this.state.tagName;

        return (
            <TagName className={styles['cmp_center-hdg']}><span>{this.props.children}</span></TagName>
        );
    }
};

export default CenterHdg;