import React from 'react'
import { NavLink, history } from 'umi'
import styles from './index.less'

import { useHistory } from "umi";
import { withRouter } from 'react-router-dom';
import { complement, none } from 'ramda';


class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.saveRef = ref => {this.refDom = ref};
        this.state = {
            i: 0,
            divStyle: {
                height: `${window.innerHeight}px`
            },
            pointStyle: {
            }
        };
        setInterval(() => {
            this.setState({
                i: (this.state.i + 1)
                    % 10
            })
            this.setState({
                divStyle: {
                    ...this.state.divStyle,
                    backgroundImage: `url(https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/00${this.state.i}.jpg)`
                }
            })
        }, 10000)
    }
    pop() {
        this.setState({
            divStyle: {
                ...this.state.divStyle,
                height: "300px"
            },
            pointStyle: {
                display: 'none'
            }
        })
    }
    render() {
        return (
            <div  className={styles.menu} style={this.state.divStyle}>
                <div className={styles.contain}>
                    <div className={styles.title}>Yuzijun's Blog</div>
                    <div className={styles.link}>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/')
                        }}><div className={styles.iconfont}>&#xe61e;</div><p>首页</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/archive')
                        }}><div className={styles.iconfont}>&#xe762;</div><p>档案</p></div>
                        <div className={styles.button} onClick={() => {
                            window.location.href = 'http://www.yzjacc.cn/resume.html'
                        }}><div className={styles.iconfont}>&#xe7b5;</div><p>简历</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/about')
                        }}><div className={styles.iconfont}>&#xe622;</div><p>关于</p></div>
                    </div></div>
                <div className={styles.point} onClick={this.pop.bind(this)} style={this.state.pointStyle}>&#xe668;
</div>
            </div>
        )
    }
}

export default withRouter(Menu)
