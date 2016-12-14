/**
 * @desc 活动模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-23
 **/

import React, { Component } from 'react'
import Animation from '../../royal/Other/QueueAnimation/'
import Table from '../../royal/Views/Table/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Pagination from '../../royal/Navigation/Pagination/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'
import { ACTIVITYS } from '../../../database/columns'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { limitStringlength, parseURL } from '../../mixins/helper'
import { getActivity, addActivity, updateActivity, deleteActivity } from '../../redux/actions/activity'

class Activity extends Component {

    constructor(props) {
        super(props)
        let _currentRow = null;
        props.activity.map((item) => {
            _currentRow = item
        })
        this.state = {
            currentRow: _currentRow,
            dataSource: props.activity.get('items').slice(0,4)
        }
        this.page = 1;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            let _start = (this.page-1)*4, _end = this.page*4;
            this.setState({
                dataSource: nextProps.activity.get('items').slice(_start, _end)
            })
        }
    }

    handleChangePage(page) {
        this.page = page;
        let _start = (this.page-1)*4, _end = this.page*4;
        this.setState({
            dataSource: this.props.activity.get('items').slice(_start, _end)
        })
    }

    handleAdd() {
        this.refs.a_img_new.setValue('')
        this.refs.a_link_new.setValue('')
        this.refs.a_title_new.setValue('')
        this.addModal.show()
    }

    handleAddSubmit() {
        let { actions, currentPage } = this.props;
        actions.addActivity({
            body: {
                pid: currentPage.get('id'),
                img: this.refs.a_img_new.getValue(),
                link: parseURL(this.refs.a_link_new.getValue()),
                title: this.refs.a_title_new.getValue(),
            },
            success: () => {
                this.pop.show()
                this.addModal.close()
                actions.getActivity({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }


    handleEditSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.updateActivity({
            body: {
                id: currentRow.get('a_id'),
                img: this.refs.a_img.getValue(),
                link: parseURL(this.refs.a_link.getValue()),
                title: this.refs.a_title.getValue(),
            },
            success: () => {
                this.pop.show()
                this.editModal.close()
                actions.getActivity({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleDeleteSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.deleteActivity({
            body: {
                id: currentRow.get('a_id'),
            },
            success: () => {
                this.pop.show()
                this.delModal.close()
                actions.getActivity({ params: {pid: currentPage.get('id')} })
            }
        })
    }

    handleEditRow(row) {
        this.setState({
            currentRow: row,
        }, ()=>{
            this.editModal.show()
        })
    }

    handleDeleteRow(row) {
        this.setState({
            currentRow: row,
        }, ()=>{
            this.delModal.show()
        })
    }

    _renderRowActivity(row, operates) {
        return (
            <tr>
                <td><img style={{height: '100px'}} src={row.get('a_img')} /></td>
                <td>{limitStringlength(row.get('a_link'), 50)}</td>
                <td>{row.get('a_title')}</td>
                <td>
                    <a onClick={()=> operates._edit(row)} style={{textDecoration: 'none', color: '#98cf07'}}>编辑</a><br/>
                    <a onClick={()=> operates._delete(row)} style={{textDecoration: 'none', color: '#ed6767'}}>删除</a>
                </td>
            </tr>
        )
    }

    render() {
        let { activity } = this.props;
        let { currentRow } = this.state;
        return (
            <li className="ry-active">
                <Animation speed={'zing'} name="fadeInLeft" style={{width: '100%', paddingTop: '10px'}}>
                    <Table dataSource={this.state.dataSource}
                        columns={ACTIVITYS}
                        operates={{_edit: (row)=>this.handleEditRow(row), _delete: (row)=>this.handleDeleteRow(row)}}
                        renderRow={this._renderRowActivity}
                    />
                    <Button wrapStyle={{float: 'left', marginTop: '15px'}} text="添加活动" icon="plus" callback={()=>this.handleAdd()} type="primary" style={{marginRight: 10}} />
                    <Pagination totalPage={Math.ceil(activity.get('items').size/4)} selectPage={(page)=>this.handleChangePage(page) } pageSpace={3}/>
                </Animation>
                <Modal title={"添加活动"} style={{width: 600, height: 280}}
                    ref={(ref)=> this.addModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="活动图片" ref="a_img_new" placeholder="输入活动的网络地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="活动链接" ref="a_link_new" placeholder="输入活动的超链接地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="活动名称" ref="a_title_new" placeholder="输入活动名称" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleAddSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.addModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"编辑活动信息"} style={{width: 600, height: 280}}
                    ref={(ref)=> this.editModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="活动图片" ref="a_img" placeholder="输入活动的网络地址" style={{width: '460px'}} value={currentRow.get('a_img')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="活动链接" ref="a_link" placeholder="输入活动的超链接地址" style={{width: '460px'}} value={currentRow.get('a_link')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="活动名称" ref="a_title" placeholder="输入活动名称" style={{width: '460px'}} value={currentRow.get('a_title')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleEditSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.editModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"删除提示"} style={{width: 420, height: 200}}
                    ref={(ref)=> this.delModal = ref}>
                    <p style={{fontSize:'14px'}}>{ '你确定要删除该活动吗？' }</p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleDeleteSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.delModal.close()} type="ghost" />
                    </p>
                </Modal>
                <PopUp ref={(ref)=>this.pop = ref} />
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        activity: state.activity,
        currentPage: state.currentPage,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ getActivity, addActivity, updateActivity, deleteActivity }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Activity)
