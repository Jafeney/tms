/**
 * @desc 页面容器 模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-23
 **/

import React, { Component } from 'react'
import Tabs from '../../royal/Navigation/Tabs/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PureRenderMixin from '../../mixins/pure-render'
import { getPageNames, updateCurrentPage } from '../../redux/actions/page'

class PageContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            activeName: ""
        }
    }

    componentDidMount() {
        this.props.actions.getPageNames({})
    }

    handleRoute(id, route, color, code) {
        this.props.actions.push(`/m/page/editor`)
        this.props.actions.updateCurrentPage({
            data: {
                id: id,
                name: route,
                color: color,
                code: code,
            }
        })
        this.setState({
            activeName: route
        })
    }

    _renderTabHeader(pageNames) {
        let _pageNames = pageNames.get('items');
        if (_pageNames.size > 0) {
            return _pageNames.map((item) => {
                return (
                    <li onClick={()=>this.handleRoute(item.get('p_id'), item.get('p_name'), item.get('p_color'), item.get('p_code'))} className={item.get('p_name')===this.state.activeName?"ry-active":""}>
                        <span><i className="icon icon-circle-blank"></i> </span>
                        <span>{item.get('p_name')}</span>
                    </li>
                )
            })
        }
    }

    render() {
        let { pageNames } = this.props;
        let error = PureRenderMixin.loadDetection([pageNames]);
        if (error) return error
        return (
            <div className="ry-tabs page">
                {/* <div style={{overflow: 'hidden', width: '1170px', height: '55px',margin: "auto",}}> */}
                    <div style={{overflow: 'hidden', width: '1170px', height: '75px',margin: "auto", overflowX: 'scroll'}}>
                        <ul className="ry-tabs-header" style={{maxWidth: '5000px', width: '5000px'}}>
                            {this._renderTabHeader(pageNames)}
                        </ul>
                    </div>
                {/* </div> */}
                <ul className="ry-tabs-mainer">
                    {this.props.children}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        pageNames: state.pageNames
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({push, getPageNames, updateCurrentPage}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
