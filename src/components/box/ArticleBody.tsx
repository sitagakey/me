import { useEffect, useState } from 'react';
import styles from '@/styles/components/box/_ArticleBody.module.scss';

const hljs = require('highlight.js');
const md = require('markdown-it')({
    html: true,
    highlight: function (str: string, lang: string) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(lang, str).value;
            } catch (__) {}
        }

        return '';
    }
}).use(require('markdown-it-footnote'));

type Props = {
    mdText: string;
};

const ArticleBody = (props: Props) => {
    const [isTLImageViewerDidMount, setIsTLImageViewerDidMount] = useState(false);

    useEffect(() => {
        if (!isTLImageViewerDidMount && window && window.hasOwnProperty('TLImageViewer')) {
            document.querySelectorAll('.js-img').forEach((el) => {
                // @ts-ignore @TODO: ライブラリをESM化する
                new window.TLImageViewer(el);
            });
    
            setIsTLImageViewerDidMount(true);
        }
    });

    return (
        <div className={styles['cmp_article-body']} dangerouslySetInnerHTML={{__html: `${md.render(props.mdText)}`}} />
    );
}

export default ArticleBody;