import React from 'react'
import { NavLink, history } from 'umi'
import styles from './index.less'

import { useHistory } from "umi";
import { withRouter } from 'react-router-dom';
import { complement, none } from 'ramda';

let demo = 0;
class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        demo++;
        this.state = {
            i: 0,
            divStyle: {
                height: `${window.innerHeight}px`,
                backgroundImage: `url(https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/0${Math.floor(Math.random()
                    * 100 / 2)}.jpg)`
            },
            pointStyle: {
            }
        };

        setInterval(() => {
            this.setState({
                i: Math.floor(Math.random()
                    * 100 / 2)

            }, () => {
                let img = new Image();
                img.src = `https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/0${this.state.i}.jpg`;
                img.onload = () => {
                    this.setState({
                        divStyle: {
                            ...this.state.divStyle,
                            backgroundImage: `url(https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/0${this.state.i}.jpg)`
                        }
                    })
                }

            })
        }, 10000)
        if (demo == 1) {
            setTimeout(() => {
                this.props.history.push('/')

            })
            console.log('componentDidMount');
        }
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
            <div className={styles.menu} style={this.state.divStyle}>
                <div className={styles.contain}>
                    <div className={styles.title}>Yuzijun's Blog</div>
                    <div className={styles.link}>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/')
                            this.pop()
                        }}><div className={styles.iconfont}>&#xe61e;</div><p>首页</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/archive')
                            this.pop()
                        }}><div className={styles.iconfont}>&#xe762;</div><p>档案</p></div>
                        <div className={styles.button} onClick={() => {
                            window.location.href = 'https://www.yzjacc.cn/resume.html'
                        }}><div className={styles.icon}>&#xe637;</div><p>简历</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/book')
                            this.pop()
                        }}><div className={styles.icon}>&#xe620;</div><p>书单</p></div>
                        <div className={styles.button} onClick={() => {
                            this.props.history.push('/about')
                            this.pop()
                        }}><div className={styles.iconfont}>&#xe622;</div><p>关于</p></div>
                    </div></div>
                <div className={styles.point} onClick={() => { this.pop() }} style={this.state.pointStyle}>&#xe668;
</div>
            </div>
        )
    }
}

export default withRouter(Menu)
