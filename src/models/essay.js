import Axios from "axios";
import { api } from "@/api/request";
export default {
  namespace: "essay",
  state: {},
  reducers: {
    getContent(state, { payload }) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *getContents(action, { put }) {
      let content = yield Axios.get(api + "blog/getblogs");
      yield put({ type: "getContent", payload: content.data });
    },
    *getLabelBlogs(action, { put }) {
      let content = yield Axios.get(
        api + "blog/getlabelblogs/" + action.payload
      );
      yield put({ type: "getContent", payload: content.data });
    },
  },
};
