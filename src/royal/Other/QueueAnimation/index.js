/**
 * @type Other Component
 * @desc 进出场动画
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class QueueAnimation extends Component {

    constructor(props) {
        super(props)
        this.state = {
            style: props.style || null,
            speed: props.speed || null,
            name: props.name || null,
        }
    }

    changeAnimate(name) {
        this.setState({name: name})
    }

    render() {
        let _speed = 'ry-animated' + (this.state.speed ? '-'+this.state.speed : '');
        return (
            <span style={this.state.style} className={_speed + ' ' + this.state.name + ' ' + this.props.className}>{this.props.children}</span>
        )
    }
}

export default QueueAnimation
