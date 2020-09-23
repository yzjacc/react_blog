import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'
import { Row, Col } from 'antd';
import React, { useEffect, PureComponent } from 'react';


export default
    class SimplifyModule extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        let { time, title, content,src } = this.props.data
        return (
            <div className={styles.main}>
                <div className={styles.title}>
                    <div className={styles.name}>
                        {title}
                    </div>
                    <div className={styles.time}>
                        {time}
                    </div>
                </div>
                <div className={styles.essay}>
                    <div className={styles.essImg}>
                        <img className={styles.img} src="https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0044.JPG"/>
                    </div>
                    <div className={styles.comment}>
                        {content}
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.logo}></div>
                    <div className={styles.button}>Try it</div>
                </div>
            </div>
        );
    }

}
