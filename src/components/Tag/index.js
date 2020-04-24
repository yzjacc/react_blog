import React,{ useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"

 class Tag extends PureComponent{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetContents()
    }

    render(){
        const blogList = []
        for(let i = 0; i < this.props.total; i++){
            if(this.props.content[i].label)
            blogList.push(<div key={i} className={styles.tag}>
                    {this.props.content[i].label}
                </div>)
        }
        return (blogList)
    }
}

const mapStateToProps = state => ({
    content: state.essay.blogs,
    total: state.essay.blogCount
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "essay/getContents"})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tag);