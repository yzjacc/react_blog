import React, { useEffect } from "react";
import { connect } from "dva";
import MDRender from "../../components/Markdown";
import styles from "./index.less";
import { useHistory } from "umi";

const Blog = ({ onGetContents, total, content, match }: any) => {
  const history = useHistory();
  console.log(history);

  useEffect(() => {
    onGetContents();
  }, []);

  if (content == undefined) return null;
  let data;
  for (let i = 0; i < total; i++) {
    if (content[i].id == match.params.id) {
      data = content[i].content;
      break;
    }
    if (i == total - 1) {
      return <div>{404}</div>;
    }
  }
  return (
    <div className={styles.content}>
      <div>
        <MDRender content={data} isBase64={false} />
      </div>
      {/* <div >{content[this.state.n].id}</div> */}
    </div>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
