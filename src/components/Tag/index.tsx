import React, { useEffect } from "react";
import styles from "./index.less";
import { connect } from "dva";
import { useHistory } from "umi";

const Tag = ({ onGetContents, content, onGetLabelBlogs }: any) => {
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    onGetContents();
  }, []);

  const blogList = [];
  for (const label in content) {
    blogList.push(
      <div
        className={styles.tag}
        key={Math.random()}
        style={{ fontSize: 13 + Math.random() * 10 + "px" }}
        onClick={() => {
          window.location.pathname !== "/archive" &&
            history.push("/archive/" + label);
          onGetLabelBlogs(label);
        }}
      >
        {label}
      </div>
    );
  }
  return blogList;
};

const mapStateToProps = (state: any) => ({
  content: state.label.labelList,
  total: state.label.labelCount,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetContents() {
    dispatch({ type: "label/getContents" });
  },
  onGetLabelBlogs(e: any) {
    dispatch({ type: "essay/getLabelBlogs", payload: e });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
