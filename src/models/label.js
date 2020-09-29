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
            let content = yield Axios.get('https://www.yzjacc.cn/blog/getlabeltotal')
            yield put({ type: "getContent", payload: content.data})
        },    
        *getLabelBlogs(action , { put }) {
            let content = yield Axios.get('https://www.yzjacc.cn/getlabelblogs/'+ 'HTML')
            yield put({ type: "getLabelBlogs", payload: content.data})
        },
    }
}
