import React from 'react'
import { NavLink, history} from 'umi'
import styles from './index.less'
import { useHistory } from "umi";

export default function Menu() {
    return (
        <div className={useHistory().location.pathname == '/about' ? styles.menuha : styles.menu }>
            <div className={styles.title}>Yuzj Blog</div>
            <div className={useHistory().location.pathname == '/about' ? styles.linkha : styles.link }>
                <NavLink to="/">首页</NavLink>
                <NavLink to="/archive">档案</NavLink>
                <div className={styles.resume} onClick={() => window.location.href ='/resume.html'}>简历</div>
                <NavLink to="/about">关于</NavLink>
                <div className={styles.center}><div className={styles.image}></div></div>
            </div>
        </div>
    )
}
