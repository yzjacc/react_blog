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
            let content = yield Axios.get('http://localhost/blog/getblogs')
            yield put({ type: "getContent", payload: content.data})
        },
        *getLabelBlogs(action , { put }) {
            let content = yield Axios.get('http://localhost/blog/getlabelblogs/' + action.payload)
            yield put({ type: "getContent", payload: content.data})
        }
    }
}
