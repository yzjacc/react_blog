import Axios from "axios";
import { api } from "./../api/request";
export default {
  namespace: "essay",
  state: {},
  reducers: {
    getContent(state: any, { payload }: any) {
      return {
        ...payload,
      };
    },
  },
  effects: {
    *getContents(action: any, { put }: any): any {
      const content = yield Axios.get(api + "blog/getblogs");
      yield put({ type: "getContent", payload: content.data });
    },
    *getLabelBlogs(action: any, { put }: any): any {
      const content = yield Axios.get(
        api + "blog/getlabelblogs/" + action.payload
      );
      yield put({ type: "getContent", payload: content.data });
    },
  },
};
