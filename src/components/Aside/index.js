import React from 'react'
import { NavLink, history} from 'umi'
import styles from './index.less'
import Clock from '../Clock'
// import Tag from '../Tag'
import { Provider } from 'react-redux'
export default function Menu() {

    return (

        <div className={styles.aside}>
            <div >
                <h2>日期 📅</h2>
                <Clock></Clock>
                <hr></hr>
            </div>
            <div>
                <h2>标签 🏷️</h2>
                {/* <Tag>dwadwadwa</Tag>
                <Tag>dwadwa</Tag>
                <Tag>d</Tag>
                <Tag>222</Tag>
                <Tag>3</Tag>
                <Tag>412</Tag> */}
                <hr></hr>
            </div>
            <div>
                <h2>网站 💻</h2>
                <hr></hr>
            </div>
        </div>

    )
}
