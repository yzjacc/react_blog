import React, { useEffect } from "react";
import styles from "./index.less";
import MDRender from "../Markdown";
import { NavLink } from "umi";
import { connect } from "dva";
const Counter = ({ onGetContents, content }: any) => {
  useEffect(() => {
    onGetContents();
  }, []);
  if (content == undefined) return null;
  const blogList = [];
  for (let i = 0; i < content.length; i++) {
    // console.log(content[i].content.split('\n').join('\n'));
    blogList.push(
      <div key={content[i].id} className={styles.single}>
        <div className={styles.title}>
          <NavLink to={`/Blog/${content[i].id}`} style={{ color: "inherit" }}>
            {content[i].title}
          </NavLink>
        </div>
        <div className={styles.main}>
          <MDRender
            content={content[i].content.split("\n").slice(0, 25).join("\n")}
            isBase64={false}
            style={{ color: "#4c4948", fontSize: "1rem" }}
          />
        </div>
        <div className={styles.footer}>{content[i].time.substring(0, 10)}</div>
      </div>
    );
  }
  return <div className={styles.content}>{blogList}</div>;
};

const mapStateToProps = (state: any) => ({
  content: state.pageBlog.blogs,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetContents() {
    dispatch({ type: "pageBlog/getPageBlog", payload: 0 });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
