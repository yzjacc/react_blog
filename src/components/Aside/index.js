import React from 'react'
import { NavLink, history} from 'umi'
import styles from './index.less'
import Clock from '../Clock'
import Tag from '../Tag'
import Music from '../music'


export default function Menu() {

    return (
        
        <div className={styles.aside}>
            <div className={styles.module}>
                <h2 className={styles.title}>&#xe6da; EveryDay Music</h2>
                {/* <Clock></Clock> */}
                <Music src ={"https://pg12138.oss-cn-beijing.aliyuncs.com/assets/other/Janet%20Seidel-You%20Belong%20To%20Me.mp3"}></Music>
            </div>    

            {/* <div className={styles.module}> */}
                {/* <h2>日期 📅</h2> */}
                {/* <img src = 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/touxiang.jpeg' className={styles.img}></img> */}
                {/* <Clock></Clock> */}
            {/* </div> */}
            <div className={styles.module}>
                <h2 className={styles.title}>&#xe62f; Tag</h2>
                <Tag></Tag>
            </div>
            {/* <div className={styles.module}>
                <h2 className={styles.title}>&#xe626; 导航</h2>
                <a>Github</a>
                <a>Github</a>
            </div> */}
        </div>

    )
}
