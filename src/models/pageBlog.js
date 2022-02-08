import Axios from "axios";
import { api } from "@/api/request";

export default {
  namespace: "pageBlog",
  state: {},
  reducers: {
    getSingleBlog(state, { payload }) {
      return {
        ...payload,
      };
    },
    getLabelBlogs(state, { payload }) {
      return {
        ...payload,
      };
    },
    getContent(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *getPageBlog(action, { put }) {
      let page = action.payload;
      let content = yield Axios.get(api + "blog/getblogs/" + page);
      yield put({ type: "getSingleBlog", payload: content.data });
    },
  },
};
