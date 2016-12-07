/**
 * @desc 基本信息模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import Animation from '../../royal/Other/QueueAnimation/'
import Icon from '../../royal/Basic/Icon/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { getPageNames, updatePageInfos, cleanCurrentPage, deletePageItem } from '../../redux/actions/page'
import { cleanCarousel } from '../../redux/actions/carousel'
import { cleanShortcut } from '../../redux/actions/shortcut'
import { cleanActivity } from '../../redux/actions/activity'
import { cleanProduct } from '../../redux/actions/product'

class Basic extends Component {

    constructor(props) {
        super(props)
    }

    onSubmit() {
        let { currentPage, actions } = this.props;
        actions.updatePageInfos({
            body: {
                page_id: currentPage.get('id'),
                new_name: this.refs.pageName.getValue(),
                new_color: this.refs.pageColor.getValue(),
                new_code: this.refs.pageCode.getValue(),
            },
            success: () => {
                actions.getPageNames({})
                this.pop.show()
            },
            error: (message) => {
                window.alert(message)
            }
        })
    }

    onModalConfirm() {
        let { currentPage, actions } = this.props;
        actions.deletePageItem({
            body: {
                page_id: currentPage.get('id'),
            },
            success: ()=>{
                this.pop.show()
                this.delModal.close()
                actions.cleanCurrentPage()
                actions.cleanCarousel()
                actions.cleanShortcut()
                actions.cleanActivity()
                actions.cleanProduct()
                actions.getPageNames({})
                actions.replace('/m/page/editor')
            },
            error: (message) => {
                window.alert(message)
            }
        })
    }

    render() {
        let { currentPage } = this.props;
        return (
            <li className="ry-active">
                <Animation speed={'zing'} name="fadeInLeft" style={{width: '100%', paddingTop: '10px'}}>
                    <div style={{marginTop: '20px', marginBottom: '40px'}}>
                        <Input name="企业名称" ref="pageName" placeholder="输入该企业的名称，如中国电信" style={{width: '250px'}} defaultValue={currentPage.get('name')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="主题颜色" ref="pageColor" placeholder="输入一个十六进制的颜色, 如#f3f3f3" style={{width: '250px'}} defaultValue={currentPage.get('color')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="邀 请 码&nbsp;" ref="pageCode" placeholder="输入一个6位邀请码, 如123456" style={{width: '250px'}} defaultValue={currentPage.get('code')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </div>
                    <Button text="删除企业" type="ghost" style={{width: '90px'}}  callback={()=>this.delModal.show()} icon="remove" />
                    <Button text="保存修改" callback={()=>this.onSubmit()} type="primary" style={{width: '90px',marginLeft: '10px'}} icon="ok" />
                </Animation>
                <Modal title={"删除提示"} style={{width: 420, height: 200}}
                    ref={(ref)=> this.delModal = ref}>
                    <p style={{fontSize:'14px'}}>{ '你确定要删除该企业吗？' }</p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.onModalConfirm()} type="primary" style={{marginRight: 10}} />
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
        currentPage: state.currentPage,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ replace, getPageNames, cleanCurrentPage, cleanCarousel, cleanShortcut, cleanActivity, cleanProduct, updatePageInfos, deletePageItem }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basic)
