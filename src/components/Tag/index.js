import React,{ useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"
import label from "../../models/label";

 class Tag extends PureComponent{
    constructor(props){
        super(props);
    }

    componentWillMount(){
        this.props.onGetContents()
    }


    render(){
        const blogList = []
        // for(let i = 0;i < this.props.total; i++){
        //     if(this.props.content[i].label)
        //     blogList.push(<div key={i} className={styles.tag}>
        //             {this.props.content[i].label}
        //         </div>)
        // }
        for(let label in this.props.content){
            console.log(label)
            blogList.push(<div className={styles.tag} onClick={() => {this.props.onGetLabelBlogs(label)}}>
                {label}
            </div>)
        }
        return (blogList)
        // return (<div></div>)
    }
}

const mapStateToProps = state => ({
    content: state.label.labelList,
    total: state.label.labelCount
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "label/getContents"})
    },
    onGetLabelBlogs(e) {
        dispatch({ type: "essay/getLabelBlogs",payload:e})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tag);