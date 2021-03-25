import React, { useEffect, PureComponent } from 'react';
import styles from './index.less';
import { connect } from "dva"
import MDRender from '../Markdown'
import { NavLink } from 'umi'

class Counter extends PureComponent {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onGetContents()
    }

    render() {
        if (this.props.content == undefined) return null
        const blogList = []
        for (let i = 0; i < this.props.content.length; i++) {
            // console.log(this.props.content[i].content.split('\n').join('\n'));
            blogList.push(
                <div key={this.props.content[i].id} className={styles.single}>
                    <div className={styles.title}><NavLink to={`/Blog/${this.props.content[i].id}`} style={{color:'inherit'}}>{this.props.content[i].title}</NavLink></div>
                    <div className={styles.main}><MDRender content={this.props.content[i].content.split('\n').slice(0, 25).join('\n')} isBase64={false} style={{color:'#4c4948'}}/></div>
                    <div className={styles.footer}>{this.props.content[i].time.substring(0, 10)}</div>
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
        dispatch({ type: "pageBlog/getPageBlog", payload: 0 })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
