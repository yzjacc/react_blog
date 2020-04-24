import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'



export default () => {
  return (
    <div>
      <Tag></Tag><ContentTitle></ContentTitle>
      <h1>关于我页面</h1>
      <Comment></Comment>
    </div>
  );
}
