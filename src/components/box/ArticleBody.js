import React from 'react';
import styles from '@/styles/components/box/_ArticleBody.module.scss';

const hljs = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return '';
    }
});

class ArticleBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isTLImageViewerDidMount: false
        }
    }

    componentDidMount() {
        if (!this.state.isTLImageViewerDidMount && window && window.hasOwnProperty('TLImageViewer')) {
            document.querySelectorAll('.js-img').forEach((el) => {
                new window.TLImageViewer(el);
            });

            this.setState({isTLImageViewerDidMount: true});
        }
    }

    render() {
        return (
            <div className={styles['cmp_article-body']} dangerouslySetInnerHTML={{__html: `${md.render(this.props.mdText)}`}} />
        );
    }
}

export default ArticleBody;