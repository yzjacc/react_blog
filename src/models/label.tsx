import Axios from "axios";
import { api } from "../api/request";

export default {
  namespace: "label",
  state: {
    labelList: undefined,
    labelCount: 0,
  },
  reducers: {
    getContent(state: any, { payload }: any) {
      return {
        ...payload,
      };
    },
    // getLabelCount(state,{payload}) {
    //     return {
    //         ...state,
    //         labelCount:payload
    //     };
    // }
  },
  effects: {
    *getContents(action: any, { put }: any): any {
      const content = yield Axios.get(api + "blog/getlabeltotal");
      yield put({ type: "getContent", payload: content.data });
    },
    *getLabelBlogs(action: any, { put }: any): any {
      const content = yield Axios.get(api + "getlabelblogs/" + "HTML");
      yield put({ type: "getLabelBlogs", payload: content.data });
    },
  },
};
