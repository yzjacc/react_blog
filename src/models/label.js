import Axios from 'axios'
export default {
    namespace:'label',
    state: {
        labelList: undefined,
        labelCount:0
    },
    reducers: {
        getContent(state,{payload}) {
            return {
                ...payload
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
        *getContents(action , { put }) {
            let content = yield Axios.get('http://127.0.0.1/blog/getlabeltotal')
            yield put({ type: "getContent", payload: content.data})
            // yield put({ type: "getLabelCount", payload: content.labelCount})
        },    
        *getLabelBlogs(action , { put }) {
            console.log(action.payload,"lallalala")
            let content = yield Axios.get('http://127.0.0.1/getlabelblogs/'+ 'HTML')
            yield put({ type: "getLabelBlogs", payload: content.data})
        },
    }
}