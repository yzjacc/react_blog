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
        let {
          time,
          title,
          content,
          imgUrl,
          isShowImg = true,
          detailUrl,
          imgStyle = null
        } = this.props.data;
        return (
          <div className={styles.main}>
            <div className={styles.title}>
              <div className={styles.name}>{title}</div>
              <div className={styles.time}>{time}</div>
            </div>
            <div className={styles.essay}>
              {isShowImg ? (
                <div className={styles.essImg} style={imgStyle}>
                  <img className={styles.img} src={imgUrl} />
                </div>
              ) : null}
              <div className={styles.comment}>{content}</div>
            </div>
            <div className={styles.footer}>
              <div className={styles.logo}></div>
              <a className={styles.button} href={detailUrl}>
                Try XMind
              </a>
            </div>
          </div>
        );
    }

}
