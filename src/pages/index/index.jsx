import React from 'react';
import Content from '../../components/Content'
import Aside from '../../components/Aside'
import './index.less'

export default () => {
  return (
    <div>
      <div className="aside"><Aside></Aside></div>
      <Content style={{margin : '0px auto'}}></Content>
    </div>
  );
}
