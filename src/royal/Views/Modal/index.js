/**
 * @type Views Component
 * @desc 对话框
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Modal extends Component {

    constructor() {
        super()
        this.state = {
            jsMask: 'ry-mask ry-hidden'
        }
    }

    show() {
        this.setState({
            jsMask: 'ry-mask'
        })
    }

    close() {
        this.setState({
            jsMask: 'ry-mask ry-hidden'
        })
    }

    render() {
        return (
            <div className={this.state.jsMask}>
                <div className="ry-modal-box" style={this.props.style}>
                    <div className="header">
                        <h3>{ this.props.title }</h3>
                        <span className="icon-remove closed-mask" onClick={()=>this.close()}></span>
                    </div>
                    <div className="mainer">
                        { this.props.children }
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal
