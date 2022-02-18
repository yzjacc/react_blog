import React from "react";
import Content from "../../components/Content";
import Aside from "../../components/Aside/index";
import styles from "./index.less";
import { Pagination } from "antd";
import { connect } from "dva";

interface IProps {
  onGetPage: () => string;
  onGetLabelBlogs: (e: string) => string;
  total: number;
}
const App = ({ onGetPage, total }: IProps) => {
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
          total={total}
          pageSize={5}
          className={styles.Pagination}
          onChange={onGetPage}
        />
      </div>
    </>
  );
};
const mapStateToProps = (state: any) => ({
  total: state.pageBlog.blogCount,
});

const mapDispatchToProps = (dispatch: any) => ({
  onGetPage(e: number) {
    dispatch({ type: "pageBlog/getPageBlog", payload: e - 1 });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
