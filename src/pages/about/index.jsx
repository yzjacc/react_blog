import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'
import { Row, Col } from 'antd';


export default () => {
    return (
        <div className={styles.content}>
            <div className={styles.image}></div>
            <div className={styles.main}>
                <div className={styles.title}>
                    <div className={styles.name}>
                        「 React 个人博客 」
                    </div>
                    <div className={styles.time}>
                        2020.04.30
                    </div>
                </div>
                <div className={styles.essay}>
                    <div className={styles.essImg}>
                    </div>
                    <div className={styles.comment}>
                        "Yanshuo.io" is an online full-featured presentation software to create Web-based slides which are linkable, sharable, cross-platform and without delivery friction. It differentiate from traditional presentation tools such as Powerpoint and Keynote due to its web-friendly and its strong belief in Web.
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.logo}></div>
                    <div className={styles.button}>Try it</div>
                </div>
            </div>
        </div>
    );
}
