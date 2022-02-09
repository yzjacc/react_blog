import React, { FC } from "react";
import styles from "./index.less";
import SimplifyModule from "../../components/SimplifyModule";

const App: FC = () => (
  <div className={styles.content}>
    <div className={styles.image}></div>
    <SimplifyModule
      data={{
        title: "「 个人简介 」",
        imgStyle: { height: "25rem" },
        // time: '2021.03.20',
        imgUrl:
          "https://pg12138.oss-cn-beijing.aliyuncs.com/assets/other/home-bg-art.jpg",
        content:
          "一枚年轻的码农，老家位于黑龙江，高中毕业后，进入本地某高校就读软件工程专业。专业目前就职于北京字节跳动有限公司，作为前端开发工程师。目前在抖音研发部门，欢迎同行一起探讨。",
      }}
    ></SimplifyModule>
  </div>
);

export default App;
