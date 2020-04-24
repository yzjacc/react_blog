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
            let content = yield Axios.get('http://localhost:800/blog/getblogs')
            yield put({ type: "getContent", payload: content.data})
        }
    }
}
