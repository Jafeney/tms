/**
 * @desc 登录页面
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'

import Icon from '../../royal/Basic/Icon/'
import Animation from '../../royal/Other/QueueAnimation/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { login, changePassword } from '../../redux/actions/user'

import './style.less'

class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            checkPass: true,
            checkCaptcha: true,
            checkRePass: true,
            captchaEnabled: false,
            captchaBtnText: '获取验证码',
            step: 1,
        }
    }

    loginValidate() {
        if (this.username.value && this.password.value) {
            this.props.actions.login({
                body: {
                    phone: this.username.value,
                    password: this.password.value,
                },
                success: () => {
                    this.props.actions.replace('/m/page')
                },
                error: (message) => {
                    this.setState({
                        checkPass: !this.state.checkPass,
                    })
                }
            })
        } else {
            this.setState({
                checkPass: !this.state.checkPass,
            })
        }
    }

    captchaValidate() {
        if (this.phone.value && this.old_password.value) {
            this.props.actions.login({
                body: {
                    phone: this.phone.value,
                    password: this.old_password.value,
                },
                success: (data) => {
                    this.userId = data[0].u_id;
                    this.setState({
                        step: 3,
                    })
                },
                error: (message) => {
                    this.setState({
                        checkCaptcha: !this.state.checkCaptcha,
                    })
                }
            })
        } else {
            this.setState({
                checkCaptcha: !this.state.checkCaptcha,
            })
        }
    }

    changePassword() {
        if (this.new_password.value !== this.re_password.value) {
            this.setState({
                checkCaptcha: !this.state.checkCaptcha,
            })
        } else {
            if (this.new_password.value && this.re_password.value) {
                this.props.actions.changePassword({
                    body: {
                        id: this.userId,
                        new_password: this.new_password.value,
                    },
                    success: () => {
                        this.setState({
                            step: 1,
                        })
                    },
                    error: (message) => {
                        window.alert(message)
                    }
                })
            }
        }
    }

    render() {
        return (
            <div className="login-wrapper">
                <div className={this.state.step === 1 ? "login-form":
                    "login-form hidden" }>
                    <Animation style={{display:'block',width: '100%'}} name="scaleIn" speed='zing'>
                        <h2>管理员登录 <label>Admin Login</label></h2>
                        <div className="form-input">
                            <Icon className="icon" name="user" />
                            <input ref={(ref)=>this.username=ref} placeholder="手机号码" type="text" />
                        </div>
                        <div className="form-input">
                            <Icon className="icon" name="lock" />
                            <input ref={(ref)=>this.password=ref} type="password" placeholder="登录密码" />
                            <label
                                className={this.state.checkPass?
                                    "check-info":"check-info error"}>
                                    用户名或密码不正确
                            </label>
                        </div>
                        <div className="form-submit">
                            <button type="button"
                                onClick={()=>this.loginValidate()}>登 录</button>
                            <a href="javascript:void(0)"
                                onClick={()=>this.setState({step: 2})}>
                                <Icon name="edit" /> 重置密码</a>
                        </div>
                    </Animation>
                </div>

                <div className={this.state.step === 2 ? "login-form":
                    "login-form hidden" }>
                    <Animation style={{display:'block',width: '100%'}} name="easeInLeft" speed='fast'>
                        <h2>重置密码 <label>Reset Password</label></h2>
                        <div className="form-input">
                            <Icon className="icon" name="user" />
                            <input ref={(ref)=>this.phone=ref} placeholder="手机号码" type="text" />
                        </div>
                        <div className="form-input">
                            <Icon className="icon" name="lock" />
                            <input ref={(ref)=>this.old_password=ref} placeholder="旧的密码" type="password" />
                            <label
                                className={this.state.checkCaptcha?
                                    "check-info":"check-info error"}>
                                    用户名或密码不正确
                            </label>
                        </div>
                        <div className="form-submit">
                            <button type="button"
                                onClick={()=>this.captchaValidate()}>继 续</button>
                            <a href="javascript:void(0)"
                                onClick={()=>this.setState({step: 1})}>
                                <Icon name="circle-arrow-left" /> 返回登录</a>
                        </div>
                    </Animation>
                </div>

                <div className={this.state.step === 3 ? "login-form":
                    "login-form hidden" }>
                    <h2>重置密码 <label>Reset Password</label></h2>
                    <Animation style={{display:'block',width: '100%'}} name="easeInLeft" speed='fast'>
                        <div className="form-input">
                            <Icon className="icon" name="lock" />
                            <input ref={(ref)=>this.new_password=ref} placeholder="新的密码" type="password" />
                        </div>
                        <div className="form-input">
                            <Icon className="icon" name="lock" />
                            <input ref={(ref)=>this.re_password=ref} type="password" placeholder="重复输入密码" />
                            <label
                                className={this.state.checkRePass?
                                    "check-info":"check-info error"}>
                                    两次输入不一致
                            </label>
                        </div>
                        <div className="form-submit">
                            <button type="button"
                                onClick={()=>this.changePassword()}>确 定</button>
                            <a href="javascript:void(0)"
                                onClick={()=>this.setState({step: 2})}>
                                <Icon name="circle-arrow-left" /> 返回</a>
                        </div>
                    </Animation>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({ replace, login, changePassword }, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
