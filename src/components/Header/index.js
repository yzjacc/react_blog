import React from 'react'
import { NavLink, history } from 'umi'
import styles from './index.less'

import { useHistory } from "umi";
import { withRouter } from 'react-router-dom';
import { complement } from 'ramda';


class Menu extends React.Component {
    render() {
        return (
            <div className={styles.menu}>
                <div className={styles.contain}>
                    <div className={styles.title}>Yuzijun's Blog</div>
                    <div className={styles.link}>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/')
                        }}><div className = {styles.iconfont}>&#xe61e;</div><p>首页</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/archive')
                        }}><div className = {styles.iconfont}>&#xe762;</div><p>档案</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/resume.html')
                        }}><div className = {styles.iconfont}>&#xe7b5;</div><p>简历</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/about')
                        }}><div className = {styles.iconfont}>&#xe622;                    </div><p>关于</p></div>
                        {/* <NavLink to="/"></NavLink>
                <NavLink to="/archive"></NavLink>
                <div className={styles.resume} onClick={() => window.location.href = '/resume.html'}></div>
                <NavLink to="/about"></NavLink> */}
                    </div></div>
                {/* <div className={styles.position}>
                <div className={styles.logo}></div>
            </div> */}
            </div>
        )
    }
}
export default withRouter(Menu)
