import React from 'react';
import styles from '@/styles/components/layout/_Footer.module.scss';

class Footer extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <footer className={styles['cmp_footer']}>
                <p><small>&copy; 2020 ひきるーむ</small></p>
            </footer>
        );
    }
}

export default Footer;