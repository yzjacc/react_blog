import React,{ useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"
import MDRender from '../Markdown'
import { NavLink } from 'umi'

 class Counter extends PureComponent{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetContents()
    }

    render(){
        if (this.props.content == undefined) return null
        const blogList = []
        for(let i = 0; i < this.props.content.length; i++){
          // let fileName = pathList.pop();
          // let fileDay = pathList.pop()
          // let fileMonth = pathList.pop()
          // let fileYear = pathList.pop()
          blogList.push(
            <div key={this.props.content[i].id} className={styles.single}>
                <NavLink to={`/Blog/${this.props.content[i].id}`} style={{color:'black',fontSize:'30px'}}>{this.props.content[i].title}</NavLink>
                <div className={styles.main}><MDRender content={this.props.content[i].content} isBase64={false} /></div>
                <div className={styles.footer}>{this.props.content[i].time.substring(0,10)}</div>
            </div>)
        }
        return (<div className={styles.content}>{blogList}</div>)
    }
}

const mapStateToProps = state => ({
    content: state.pageBlog.blogs,
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "pageBlog/getPageBlog" , payload : 1})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
