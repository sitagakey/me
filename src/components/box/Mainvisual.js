import React from 'react';
import styles from '@/styles/components/box/_Mainvisual.module.scss';

const Mainvisual = () => {
    return (
        <div className={styles['cmp_mainvisual']}>
            <img src="/images/mv.png" alt="ひきるーむ" srcSet="/images/mv.png, /images/mv@2x.png 2x"/>
            <div>
                <p>ここはワイのホームページや彡(^)(^)<br/> 嘘を嘘と見抜けるヤツだけ見てくれな！</p>
            </div>
        </div>
    );
}

export default Mainvisual;