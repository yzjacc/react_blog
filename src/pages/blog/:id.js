import React,{ useEffect, PureComponent } from 'react';
import { connect } from "dva"
import MDRender from '../../components/Markdown'
import { NavLink } from 'umi'
import styles from './index.less';

class Blog extends PureComponent{

  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.onGetContents()
  }

  render(){
    if(this.props.content == undefined) return null
    let content
    for(let i = 0; i < this.props.total; i++){
      if(this.props.content[i].id == this.props.match.params.id) {
        content =  this.props.content[i].content;
        break;
      }
      if(i == this.props.total -1 ){
      return (<div>{404}</div>)
      }
    }
    return (
      <div className={styles.content}>
        <div><MDRender content={content} isBase64={false} /></div>
        {/* <div >{this.props.content[this.state.n].id}</div> */}
      </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
