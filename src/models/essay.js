import Axios from 'axios'
export default {
    namespace:'essay',
    state: {

    },
    reducers: {
        getContent(state,{payload}) {
            return {
               ...payload
            };
        }
    },
    effects: {
        *getContents(action , { put }) {
            let content = yield Axios.get('http://www.yzjacc.cn/blog/getblogs')
            yield put({ type: "getContent", payload: content.data})
        },
        *getLabelBlogs(action , { put }) {
            let content = yield Axios.get('http://www.yzjacc.cn/blog/getlabelblogs/' + action.payload)
            yield put({ type: "getContent", payload: content.data})
        }
    }
}
