import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';


export default () => {
  return (
    <div>
      <div className={styles.tag}>Tag</div>
      <Tag></Tag>
      <h1>关于我页面</h1>
      <Comment></Comment>
    </div>
  );
}
