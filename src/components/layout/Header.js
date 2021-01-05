import React from 'react';
import Link from 'next/link';
import styles from '@/styles/components/layout/_Header.module.scss';

const h1Title = 'ひきるーむ';
const navListItem = [
    {
        href: 'https://twitter.com/hikiroom',
        name: 'Twitter',
    },
    {
        href: 'https://github.com/hikiroom',
        name: 'GitHub',
    },
];

class Header extends React.Component {
    constructor(props) {
        super(props);

        const {hasTitle} = props;

        this.navigation = React.createRef();
        this.state = {
            isActive: false,
            hasTitle,
        };
    }
    render() {
        return (
            <header className={styles['cmp_header']}>
                <div className={styles['cmp_header_inr']}>
                    {
                        this.state.hasTitle ? 
                            (<p className={styles['cmp_header_hdg']}><Link href="/"><a>{h1Title}</a></Link></p>) :
                            (<h1 className={styles['cmp_header_hdg']}><Link href="/"><a>{h1Title}</a></Link></h1>)
                    }
                    <nav ref={this.navigation} className={styles['cmp_header_nav'] + (this.state.isActive ?  ` ${styles['is-active']}`: '')}>
                        <ul className={styles['cmp_header_nav-list']}>
                            {
                                navListItem.map(({href, name}) => (
                                    <li key={href} className={styles['cmp_header_nav-list-item']}>
                                        <Link href={href}><a>{name}</a></Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;