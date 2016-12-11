/**
 * @desc 商城入口
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import './style.less'
import Animation from '../../royal/Other/QueueAnimation/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PureRenderMixin from '../../mixins/pure-render'
import { auth, getPageNames, updateCurrentPage } from '../../redux/actions/page'

class Door extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        document.getElementById('page_title').innerHTML = '有福企业内购平台';
        this.props.actions.getPageNames({})
    }

    _renderPageItems(pages) {
        let _pages = pages.get('items');
        if (_pages.size > 0) {
            return pages.get('items').map((page) =>
                <option>{page.get('p_name')}</option>)
        }
    }

    render() {
        let { pageNames } = this.props;
        let error = PureRenderMixin.loadDetection([pageNames])
        if (error) return error
        return (
            <div className="door">
                <div className="mask">
                    <Animation style={{display: 'block'}} name="scaleIn" speed='fast' className="modal">
                        <div className="input-row">
                            <span className="input-label">选择您的企业</span>
                            <select ref="company" className="select">
                                {this._renderPageItems(pageNames)}
                            </select>
                        </div>
                        <div className="input-row">
                            <span className="input-label">企业的邀请码</span>
                            <input ref="code" placeholder="输入您的邀请码" type="number" className="input" />
                        </div>
                        <div onClick={()=>this.toHome()}
                            className="input-submit">抢福利（仅对合作企业开放）</div>
                    </Animation>
                </div>
            </div>
        )
    }

    toHome() {
        let { actions } = this.props;
        actions.auth({
            body: {
                name: this.refs.company.value,
                code: this.refs.code.value,
            },
            success: (data) => {
                if (data.page_name) {
                    actions.updateCurrentPage({
                        data: {
                            id: data.page_id,
                            name: data.page_name,
                            color: data.page_color,
                            code: data.page_code,
                        }
                    })
                    actions.push('home')
                }
            },
            error: (data) => {
                window.alert('邀请码不正确！')
            }
        })
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pageNames: state.pageNames
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({push, auth, getPageNames, updateCurrentPage}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Door)
