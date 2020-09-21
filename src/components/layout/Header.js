import React from 'react';
import Link from 'next/link';
import MenuBtn from '@/components/btn/MenuBtn';
import styles from '@/styles/components/layout/_Header.module.scss';

const h1Title = 'ひきるーむ';
const navListItem = [
    {
        href: '/about',
        name: 'ワイについて',
    },
    {
        href: '/works',
        name: '作ったもの',
    },
    {
        href: '/blog',
        name: 'チラ裏',
    },
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
            currentPath: '',
            hasTitle,
        };
    }
    componentDidMount() {
        this.setState({currentPath: location.pathname});
        this.navigation.current.addEventListener('transitionend', this.navigationOntransitionend.bind(this));
    }
    toggleActiveState() {
        this.accordion(!this.state.isActive);
        this.setState({
            isActive: !this.state.isActive
        });
    }
    accordion(isOpen) {
        console.log(isOpen)
        if (isOpen) {
            const h = this.navigation.current.scrollHeight;

            this.navigation.current.style.height = '0';
            this.navigation.current.scrollHeight;
            this.navigation.current.style.height = `${h}px`;
        } else {
            this.navigation.current.style.height = `${this.navigation.current.scrollHeight}px`;
            this.navigation.current.scrollHeight;
            this.navigation.current.style.height = '0';
        }
    }
    navigationOntransitionend(e) {
        if (e.propertyName === 'height') {
            this.navigation.current.style.height = '';
        }
    }
    render() {
        return (
            <header className={styles['cmp_header']}>
                {
                    this.state.hasTitle ? 
                        (<p className={styles['cmp_header__hdg']}><Link href="/"><a>{h1Title}</a></Link></p>) :
                        (<h1 className={styles['cmp_header__hdg']}><Link href="/"><a>{h1Title}</a></Link></h1>)
                }
                <MenuBtn isActive={this.state.isActive} onClick={() => this.toggleActiveState.bind(this)} />
                <nav ref={this.navigation} className={styles['cmp_header__nav'] + (this.state.isActive ?  ` ${styles['is-active']}`: '')}>
                    <ul className={styles['cmp_header__nav-list']}>
                        {
                            navListItem.map(({href, name}) => (
                                <li key={href} className={styles['cmp_header__nav-list-item'] + (new RegExp(`^${href}`).test(this.state.currentPath) ? ` ${styles['is-active']}` : '')}>
                                    <Link href={href}><a>{name}</a></Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;