import React, { useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"
import label from "../../models/label";

class Tag extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onGetContents()
    }


    render() {
        const blogList = []
        for (let label in this.props.content) {
            //key bug
            blogList.push(<div className={styles.tag} key={Math.random()} style={{ fontSize: 13 + Math.random() * 10 + "px" }} onClick={() => { this.props.onGetLabelBlogs(label) }}>
                {label}
            </div>)
        }
        return (blogList)
    }
}

const mapStateToProps = state => ({
    content: state.label.labelList,
    total: state.label.labelCount
})

const mapDispatchToProps = dispatch => ({
    onGetContents() {
        dispatch({ type: "label/getContents" })
    },
    onGetLabelBlogs(e) {
        dispatch({ type: "essay/getLabelBlogs", payload: e })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Tag);