import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'
import { Row, Col } from 'antd';
import SimplifyModule from '../../components/SimplifyModule'


export default () => {
  return (
    <div className={styles.content}>
      <SimplifyModule
        data={{
          title: '「 正念的奇迹 」',
          time: '2020.09.23',
          url: '',
          content: '"Yanshuo.io" is an online full-featured presentation software to create Web-based slides which are linkable, sharable, cross-platform and without delivery friction. It differentiate from traditional presentation tools such as Powerpoint and Keynote due to its web-friendly and its strong belief in Web.'
        }
        }
      ></SimplifyModule>
    </div>
  );
}
