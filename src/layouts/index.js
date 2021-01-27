import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import './index.less'

export default function index(props) {
  return (
    <div>
      <Header></Header>
      <div className="content">{props.children}</div>
      <Footer></Footer>
    </div>
  );
}
