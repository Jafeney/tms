/**
 * @desc 弹性布局 组件
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-25
 **/

import React, { Component, PropsType } from 'react'
import './style.less'

class View extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={"ry-flex " + this.props.className} style={this.props.style}>
                {this.props.children}
            </div>
        )
    }
}

export default View
