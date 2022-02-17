import React, { useEffect, FC } from "react";
import styles from "./index.less";
import { connect } from "dva";
import { NavLink } from "umi";
interface IProps {
  onGetContents: () => string;
  onGetLabelBlogs: (e: string) => string;
  total: number;
  content: Record<string, Content>;
}

interface Content {
  id: number;
  title: string;
  time: string;
}
const CountentTitle = ({ onGetContents, content, total }: IProps) => {
  useEffect(() => {
    onGetContents();
  }, []);
  const blogList = [];
  for (let i = 0; i < total; i++) {
    // let fileName = pathList.pop();
    // let fileDay = pathList.pop()
    // let fileMonth = pathList.pop()
    // let fileYear = pathList.pop()
    blogList.push(
      <div key={content[i].id} className={styles.single}>
        <NavLink
          to={`/Blog/${content[i].id}`}
          style={{ color: "rgb(64, 64, 64)", fontSize: "1.375rem" }}
        >
          {content[i].title}
        </NavLink>
        <div className={styles.time}>{content[i].time.substring(0, 10)}</div>
      </div>
    );
  }
  return <div className={styles.content}>{blogList}</div>;
};

const mapStateToProps = (state: any) => ({
  content: state.essay.blogs,
  total: state.essay.blogCount,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetContents() {
    dispatch({ type: "essay/getContents" });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CountentTitle);
