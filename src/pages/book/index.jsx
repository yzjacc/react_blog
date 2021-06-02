import React from "react";
import Comment from "../../components/Comment";
import styles from "./index.less";
import Tag from "../../components/Tag";
import ContentTitle from "../../components/ContentTitle";
import { Row, Col } from "antd";
import SimplifyModule from "../../components/SimplifyModule";
import bookList from "../../const/book.json";

export default () => {
  return (
    <div className={styles.content}>
      {bookList.data.map((element,index) => {
        return (
          <SimplifyModule
            key={index}
            data={{
              title: element.title,
              time: element.time,
              imgUrl: element.imgUrl,
              detailUrl: element.detailUrl,
              content: element.content,
            }}
          />
        );
      })}
    </div>
  );
};
