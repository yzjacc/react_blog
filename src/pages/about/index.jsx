import React from 'react';
import Comment from '../../components/Comment';
import styles from './index.less'
import Tag from '../../components/Tag';
import ContentTitle from '../../components/ContentTitle'
import { Row, Col } from 'antd';
import SimplifyModule from '../../components/SimplifyModule'


export default () => {
    return (
        <div className={styles.content}>
            <div className={styles.image}></div>
            <SimplifyModule
                data={{
                    title: '「 个人简介 」',
                    time: '2020.04.30',
                    url: 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0044.JPG',
                    content: '"Yanshuo.io" is an online full-featured presentation software to create Web-based slides which are linkable, sharable, cross-platform and without delivery friction. It differentiate from traditional presentation tools such as Powerpoint and Keynote due to its web-friendly and its strong belief in Web.'
                }
                }
            ></SimplifyModule>
            {/* <SimplifyModule
                data={{
                    title: '个人简介',
                    time: '2021.01.28',
                    isShowImg:false,
                    url: 'https://pg12138.oss-cn-beijing.aliyuncs.com/img/IMG_0044.JPG',
                    content: '一位来自某地某公司的 前端开发工程师 目前大三\n专注于个人成长 以及公司产品优化'
                }
                }
            ></SimplifyModule> */}
        </div>
    );
}
