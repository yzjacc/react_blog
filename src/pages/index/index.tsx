import React from "react";
import Content from "../../components/Content";
import Aside from "../../components/Aside/index";
import styles from "./index.less";
import { connect } from "dva";

import { Pagination } from "antd";

function f(props: any) {
  return (
    <>
      <div className={styles.aside}>
        <Aside></Aside>
      </div>
      <div className={styles.content}>
        <Content></Content>
      </div>

      <div className={styles.page}>
        <Pagination
          size="small"
          simple
          total={props.total}
          pageSize={5}
          className={styles.Pagination}
          onChange={props.onGetPage}
        />
      </div>
    </>
  );
}
const mapStateToProps = (state: any) => ({
  total: state.pageBlog.blogCount,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetPage(e: any) {
    dispatch({ type: "pageBlog/getPageBlog", payload: e - 1 });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(f);
