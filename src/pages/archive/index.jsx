import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'



export default () => {
  return (
    <div className={styles.content}>
      <div className={styles.tag}><Tag></Tag></div>
      <ContentTitle></ContentTitle>
      <h1>评论</h1>
      <Comment></Comment>
    </div>
  );
}
