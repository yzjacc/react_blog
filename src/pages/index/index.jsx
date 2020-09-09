import React from 'react';
import Content from '../../components/Content'
import Aside from '../../components/Aside'
import styles from './index.less'
import { connect } from "dva"

import { Pagination } from 'antd';

function f(props) {
    return (
        <>
            <div className={styles.aside}><Aside></Aside></div>
            <Content></Content>
            <div className={styles.page}>
                <Pagination size="small"
                    total={props.total}
                    pageSize={5}
                    onChange={props.onGetPage}
                />
            </div>
        </>

    );
}
const mapStateToProps = state => ({
    total: state.pageBlog.blogCount,
})


const mapDispatchToProps = dispatch => ({
    onGetPage(e) {
        dispatch({ type: "pageBlog/getPageBlog", payload: e })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(f);
