import React, { FC } from "react";
import styles from "./index.less";
import SimplifyModule from "../../components/SimplifyModule";
import bookList from "../../assets/book.json";

const App: FC = () => {
  return (
    <div className={styles.content}>
      {bookList.data.map((element, index) => {
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
export default App;
