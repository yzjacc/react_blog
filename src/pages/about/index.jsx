import React,{ useEffect, PureComponent } from 'react';
import { connect } from "dva"
import MDRender from '../../components/Markdown'
import { NavLink } from 'umi'
import styles from './index.less';

function f(props) {
    useEffect(props.onGetContents, [])
    const blogList = []
    if(props.content == undefined) {return (<div></div>)}
    for(let i = 0; i < 5; i++){
        // let fileName = pathList.pop();
        // let fileDay = pathList.pop()
        // let fileMonth = pathList.pop()
        // let fileYear = pathList.pop()
        blogList.push(
            <div key={props.content[i].id} className={styles.single}>
                <NavLink to={`/Blog/${props.content[i].id}`} style={{color:'black',fontSize:'30px'}}>{props.content[i].title}</NavLink>
                <div className={styles.main}><MDRender content={props.content[i].content} isBase64={false} /></div>
                <div className={styles.footer}>{props.content[i].time}</div>
            </div>)
    }
    return (<div className={styles.content}>{blogList}</div>)
    // return (<div></div>)

}

const mapStateToProps = state => ({
    content: state.pageBlog.blogs,
    total: state.pageBlog.blogCount
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "pageBlog/getPageBlog"})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(f);
