import React, { FC } from "react";
import styles from "./index.less";
import Tag from "../../components/Tag";
import ContentTitle from "../../components/ContentTitle";

const App: FC = () => {
  return (
    <div className={styles.content}>
      <div className={styles.tag}>
        <Tag></Tag>
      </div>
      <ContentTitle></ContentTitle>
    </div>
  );
};
export default App;
