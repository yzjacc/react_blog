import Axios from 'axios'
export default {
    namespace:'pageBlog',
    state: {

    },
    reducers: {
        getSingleBlog(state,{payload}) {

            return {
                ...payload
            };
        },
        getLabelBlogs(state,{payload}) {
            console.log(payload)
            return {
                ...payload
            };
        },
        getContent(state,{payload}) {
            return {
                ...payload
            };
        }
    },
    effects: {
        *getPageBlog(action , { put }) {
            let page = action.payload
            let content = yield Axios.get('http://127.0.0.1/blog/getblogs/'+page)
            yield put({ type: "getSingleBlog", payload: content.data})
        }
    }
}