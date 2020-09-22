import React from 'react'
import { NavLink, history} from 'umi'
import styles from './index.less'
import Clock from '../Clock'
import Tag from '../Tag'

export default function Menu() {

    return (

        <div className={styles.aside}>
            <div className={styles.module}>
                <h2 className={styles.title}>&#xe6da; 公告</h2>
                <Clock></Clock>
            </div>           
            {/* <div className={styles.module}> */}
                {/* <h2>日期 📅</h2> */}
                {/* <img src = 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/2020/touxiang.jpeg' className={styles.img}></img> */}
                {/* <Clock></Clock> */}
            {/* </div> */}
            <div className={styles.module}>
                <h2 className={styles.title}>&#xe62f; 标签</h2>
                <Tag></Tag>
            </div>
            <div className={styles.module}>
                <h2 className={styles.title}>&#xe626; 导航</h2>
            </div>
        </div>

    )
}
