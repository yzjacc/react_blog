import React,{ useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"
import MDRender from '../Markdown'
import { NavLink } from 'umi'

 class CountentTitle extends PureComponent{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetContents()
    }

    render(){
        const blogList = []
        for(let i = 0; i < this.props.total; i++){
          // let fileName = pathList.pop();
          // let fileDay = pathList.pop()
          // let fileMonth = pathList.pop()
          // let fileYear = pathList.pop()
          blogList.push(
            <div key={this.props.content[i].id} className={styles.single}>
                <NavLink to={`/Blog/${this.props.content[i].id}`} style={{color: 'rgb(64, 64, 64)',fontSize:'1.375rem'}}>{this.props.content[i].title}</NavLink>
                <div className={styles.time}>{this.props.content[i].time.substring(0,10)}</div>
            </div>)
        }
        return (<div className={styles.content}>{blogList}</div>)
    }
}

const mapStateToProps = state => ({
    content: state.essay.blogs,
    total: state.essay.blogCount,
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "essay/getContents"})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CountentTitle);
