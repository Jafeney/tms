/**
 * @desc 管理后台容器 container
 * @author Jafeney
 * @dateTime 2016-05-17
 **/

import React, { Component } from 'react'
import Layout from '../../royal/Basic/Layout/'
import Icon from '../../royal/Basic/Icon/'
import DropDown from '../../royal/Views/Dropdown/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { addPage, getPageNames } from '../../redux/actions/page'

class Main extends Component {

    constructor(props) {
        super(props)
        // 侧边栏导航列表
        this.navData = [['desktop','模板管理','Pages Management'], ['cogs', '系统设置', 'System Setting']]
        this.navData = [
            { name: '模板管理', desc: 'Pages Management', icon: 'desktop', route: 'page' },
            // { name: '系统设置', desc: 'System Management', icon: 'cogs', route: 'setup' },
        ];
        this.state = {
            navActive: 0
        }
    }

    handleAdd() {
        this.refs.pageName.setValue('')
        this.refs.pageCode.setValue('')
        this.refs.pageColor.setValue('')
        this.addModal.show()
    }

    handleQrcode() {
        this.qrModal.show()
    }

    handleModalSubmit() {
        let { actions } = this.props;
        actions.addPage({
            body: {
                name: this.refs.pageName.getValue(),
                code: this.refs.pageCode.getValue(),
                color: this.refs.pageColor.getValue(),
            },
            success: () => {
                this.pop.show()
                this.addModal.close()
                actions.getPageNames({})
            },
            error: (message) => {
                window.alert(message)
            }
        })
    }

    switchNav(i) {
        this.setState({ navActive: i })
        this.props.actions.replace(`/m/${this.navData[i].route}`)
    }

    handleLogout() {
        this.props.actions.replace('/')
    }

    _renderNavbar() {
        return this.navData.map((item, i)=>{
            return [
                <li onClick={()=>this.switchNav(i)}
                    className={this.state.navActive===i?'active':''}>
                    <Icon className="icon" name={item.icon} />
                    <span className="name" >{item.name}</span>
                    <span className="caret"></span>
                </li>
            ]
        })
    }

    _renderSubNav(item) {
        return item.map(sub=>[<li>{sub}</li>])
    }

    _renderTopItem(item, callback) {
        return (
            <li className="top-list-item" onClick={()=>callback && callback()}>
                <Icon name={item[1]} style={{marginRight: 10}} />
                <label>{item[0]}</label>
            </li>
        )
    }

    render() {
        let dataList = [['个人中心','user'],['修改密码','edit'],['注销登录','off']]
        let callbacks = [0,()=>this.handleLogout(),()=>this.handleLogout()]
        return (
            <div className="wrapper">
                <div className="navbar">
                    <h2 className="logo"></h2>
                    <ul className="nav-list">
                        {this._renderNavbar()}
                    </ul>
                </div>
                <div className="topbar">
                    <div className="content">
                        <DropDown
                            dropped={false}
                            icon={null}
                            dataList={dataList}
                            renderItem={this._renderTopItem}
                            operates={callbacks}
                            title="Welcome to da56.com " />
                        <h2 className="module">
                            <span>{this.navData[this.state.navActive].name} </span>
                            <label>/ {this.navData[this.state.navActive].desc}</label>
                        </h2>
                    </div>
                    <div onClick={()=>this.handleAdd()} className="fast-btn"><Icon name="plus" /></div>
                    <div onClick={()=>this.handleQrcode()} className="fast-btn show"><Icon name="qrcode" /></div>
                </div>
                <div className="container">
                    {this.props.children}
                </div>
                <Modal title={"添加企业"} style={{width: 420, height: 270}}
                    ref={(ref)=> this.addModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="企业名称" ref="pageName" placeholder="输入该企业的名称，如中国电信" style={{width: '280px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="主题颜色" ref="pageColor" placeholder="输入一个十六进制的颜色, 如#f3f3f3" style={{width: '280px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="邀 请 码&nbsp;" ref="pageCode" placeholder="输入一个6位邀请码, 如123456" style={{width: '280px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleModalSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.addModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"打开微信扫一扫"} style={{width: 400, height: 300}}
                    ref={(ref)=> this.qrModal = ref}>
                    <p style={{textAlign: 'center'}}>
                        <img src="/img/qrcode.jpg" style={{width: '200px'}} />
                    </p>
                </Modal>
                <PopUp ref={(ref)=>this.pop = ref} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, addPage, getPageNames }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
