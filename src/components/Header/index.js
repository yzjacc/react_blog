import React from 'react'
import { NavLink, history } from 'umi'
import styles from './index.less'
import imgBase64 from './backImg'

import { useHistory } from "umi";
import { withRouter } from 'react-router-dom';
import { complement, none } from 'ramda';

class Menu extends React.PureComponent {
    constructor(props) {
        super(props);
        let arr = ['天下大事，必作于细，天下难事，必作于易。',
            '冲天香阵透长安，满城尽带黄金甲。',
            '举杯邀明月，对影成三人。',
            '月既不解饮，影徒随我身。',
            '待到秋来九月八，我花开后百花杀。'
            , '物有本末，事有终始。知所先后，则近道矣。'
            , '人闲桂花落，夜静春山空。'
            , '黄昏庭院柳啼鸦，记得那人，和月折梨花。'
            , '楼写春云色，珠含明月辉。'
            , '雅俗共赏']
        this.i = 0;
        this.timer = null;
        this.text = '';

        this.text = arr[Math.floor(Math.random() * 10)];
        this.state = {
            i: 0,
            text: "",
            divStyle: {
                height: `${window.innerHeight}px`,
                backgroundImage: `url(${imgBase64})`
            },
            pointStyle: {
            }
        };

        setInterval(() => {
            this.changeImg = Math.floor(Math.random()
                * 100 / 2 + 1)
            this.img = new Image()
            this.img.src = `https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/0${this.changeImg}.jpg`;
            this.img.onload = () => {
                this.setState({
                    divStyle: {
                        ...this.state.divStyle,
                        backgroundImage: `url(https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/0${this.changeImg}.jpg)`
                    }
                })
            }
        }, 10000)

    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                text: this.text.substring(0, this.i)
            }, () => {
                this.i++;
                if (this.state.text == this.text) {
                    clearInterval(this.timer);
                };
            })
        }, 200);

    }
    pop() {
        this.setState({
            divStyle: {
                ...this.state.divStyle,
                height: "25rem"
            },
            pointStyle: {
                display: 'none'
            }
        })
    }

    render() {
        return (
            <div className={styles.menu} style={this.state.divStyle}>
                <div className={styles.leftTitle}>Hugo Yu</div>
                <div className={styles.contain}>
                    <div className={styles.title}>Hugo Yu</div>
                    <div className={styles.bottom}>{this.state.text}</div>
                </div>

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
                </div>

                <div className={styles.point} onClick={() => { this.pop() }} style={this.state.pointStyle}>&#xe668;
</div>

            </div>
        )
    }
}

export default withRouter(Menu)
