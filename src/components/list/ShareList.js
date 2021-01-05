import React from 'react';
import {
    FacebookShareButton,
    FacebookIcon,
    HatenaShareButton,
    HatenaIcon,
    LineShareButton,
    LineIcon,
    TwitterShareButton,
    TwitterIcon,
} from 'react-share';
import styles from '@/styles/components/list/_ShareList.module.scss';

class ShareList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['cmp_share-list']}>
                <p className={styles['cmp_share-list_hdg']}><span>シェアする</span></p>
                <ul className={styles['cmp_share-list_list']}>
                    <li className={styles['cmp_share-list_list-item']}>
                        <TwitterShareButton url={this.props.url} title={this.props.title}>
                            <TwitterIcon size={40} round={true} />
                        </TwitterShareButton>
                    </li>
                    <li className={styles['cmp_share-list_list-item']}>
                        <FacebookShareButton url={this.props.url}>
                            <FacebookIcon size={40} round={true} />
                        </FacebookShareButton>
                    </li>
                    <li className={styles['cmp_share-list_list-item']}>
                        <HatenaShareButton url={this.props.url} title={this.props.title}>
                            <HatenaIcon size={40} round={true} />
                        </HatenaShareButton>
                    </li>
                    <li className={styles['cmp_share-list_list-item']}>
                        <LineShareButton url={this.props.url} title={this.props.title}>
                            <LineIcon size={40} round={true} />
                        </LineShareButton>
                    </li>
                </ul>
            </div>
        );
    }
}

export default ShareList;