/**
 * @desc 用户模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import Animation from '../../royal/Other/QueueAnimation/'
import Icon from '../../royal/Basic/Icon/'
import Table from '../../royal/Views/Table/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'
import { SHORTCUTS } from '../../../database/columns'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { limitStringlength, parseURL } from '../../mixins/helper'
import { getShortcut, addShortcut, updateShortcut, deleteShortcut } from '../../redux/actions/shortcut'

class Shortcut extends Component {

    constructor(props) {
        super(props)
        let _currentRow = null;
        props.shortcut.map((item) => {
            _currentRow = item
        })
        this.state = {
            currentRow: _currentRow,
        }
    }

    handleAdd() {
        if (this.props.shortcut.get('items').size < 4) {
            this.refs.s_icon_new.setValue('')
            this.refs.s_link_new.setValue('')
            this.refs.s_name_new.setValue('')
            this.refs.s_color_new.setValue('')
            this.addModal.show()
        } else {
            window.alert('抱歉，图标不能超过4个')
        }
    }

    handleAddSubmit() {
        let { actions, currentPage } = this.props;
        actions.addShortcut({
            body: {
                pid: currentPage.get('id'),
                icon: this.refs.s_icon_new.getValue(),
                link: parseURL(this.refs.s_link_new.getValue()),
                name: this.refs.s_name_new.getValue(),
                color: this.refs.s_color_new.getValue()
            },
            success: () => {
                this.pop.show()
                this.addModal.close()
                actions.getShortcut({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleEditSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.updateShortcut({
            body: {
                id: currentRow.get('s_id'),
                icon: this.refs.s_icon.getValue(),
                link: parseURL(this.refs.s_link.getValue()),
                name: this.refs.s_name.getValue(),
                color: this.refs.s_color.getValue()
            },
            success: () => {
                this.pop.show()
                this.editModal.close()
                actions.getShortcut({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleDeleteSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.deleteShortcut({
            body: {
                id: currentRow.get('s_id'),
            },
            success: () => {
                this.pop.show()
                this.delModal.close()
                actions.getShortcut({ params: {pid: currentPage.get('id')} })
            }
        })
    }

    handleEditRow(row) {
        this.setState({
            currentRow: row,
        }, () => {
            this.editModal.show()
        })
    }

    handleDeleteRow(row) {
        this.setState({
            currentRow: row,
        }, () => {
            this.delModal.show()
        })
    }

    _renderRowShortcut(row, operates) {
        return (
            <tr>
                <td style={{paddingLeft: '20px'}}><Icon name={row.get('s_icon')}/></td>
                <td>{row.get('s_name')}</td>
                <td>{row.get('s_color')}</td>
                <td>{limitStringlength(row.get('s_link'), 60)}</td>
                <td>
                    <a onClick={()=> operates._edit(row)} style={{textDecoration: 'none', color: '#98cf07'}}>编辑</a><br/>
                    <a onClick={()=> operates._delete(row)} style={{textDecoration: 'none', color: '#ed6767'}}>删除</a><br/>
                </td>
            </tr>
        )
    }

    render() {
        let { shortcut } = this.props;
        let { currentRow } = this.state;
        return (
            <li className="ry-active">
                <Animation speed={'zing'} name="fadeInLeft" style={{width: '100%', paddingTop: '10px'}}>
                    <Table dataSource={shortcut.get('items')} columns={SHORTCUTS}
                        operates={{_edit: (row)=>this.handleEditRow(row), _delete: (row)=>this.handleDeleteRow(row)}}
                        renderRow={this._renderRowShortcut}
                    />
                    <p style={{marginTop: '15px'}}><Button text="添加图标" icon="plus" callback={()=>this.handleAdd()} type="primary" style={{marginRight: 10}} /></p>
                </Animation>
                <Modal title={"添加图标"} style={{width: 600, height: 330}}
                    ref={(ref)=> this.addModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="图标别称" ref="s_icon_new" placeholder="输入图标的别称，参见 http://royal.jafeney.com/index.html#/icon" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <a style={{paddingLeft: '350px', position: 'relative', top: '-5px'}} href="http://royal.jafeney.com/index.html#/icon" target="_blank" >更多图标参见Royal Icon组件</a>
                        <Input name="图标名称" ref="s_name_new" placeholder="输入图标的名称" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图标颜色" ref="s_color_new" placeholder="输入图标的十六进制颜色值，如 #dea32c" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图标链接" ref="s_link_new" placeholder="输入图标的超链接" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleAddSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.addModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"编辑轮播信息"} style={{width: 600, height: 330}}
                    ref={(ref)=> this.editModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="图标别称" ref="s_icon" placeholder="输入图标的别称，参见 http://royal.jafeney.com/index.html#/icon" style={{width: '460px'}} value={currentRow.get('s_icon')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <a style={{paddingLeft: '350px', position: 'relative', top: '-5px'}} href="http://royal.jafeney.com/index.html#/icon" target="_blank" >更多图标参见Royal Icon组件</a>
                        <Input name="图标名称" ref="s_name" placeholder="输入图标的名称" style={{width: '460px'}} value={currentRow.get('s_name')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图标颜色" ref="s_color" placeholder="输入图标的十六进制颜色值，如 #dea32c" style={{width: '460px'}} value={currentRow.get('s_color')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图标链接" ref="s_link" placeholder="输入图标的超链接" style={{width: '460px'}} value={currentRow.get('s_link')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleEditSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.editModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"删除提示"} style={{width: 420, height: 200}}
                    ref={(ref)=> this.delModal = ref}>
                    <p style={{fontSize:'14px'}}>{ '你确定要删除该图标吗？' }</p>
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
        shortcut: state.shortcut,
        currentPage: state.currentPage,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ getShortcut, addShortcut, updateShortcut, deleteShortcut }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shortcut)
