import Axios from "axios";
import { api } from "../api/request";

export default {
  namespace: "pageBlog",
  state: {},
  reducers: {
    getSingleBlog(state: any, { payload }: any) {
      return {
        ...payload,
      };
    },
    getLabelBlogs(state: any, { payload }: any) {
      return {
        ...payload,
      };
    },
    getContent(state: any, { payload }: any) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *getPageBlog(action: any, { put }: any) {
      let page = action.payload;
      let content = yield Axios.get(api + "blog/getblogs/" + page);
      yield put({ type: "getSingleBlog", payload: content.data });
    },
  },
};
