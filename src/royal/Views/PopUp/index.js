/**
 * @type Views Component
 * @desc 浮出式提示
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import Icon from '../../Basic/Icon/'
import './style.less'

class PopUp extends Component {

    constructor() {
        super()
        this.state = {
            jsMask: 'ry-popup ry-hidden'
        }
    }

    show() {
        this.setState({
            jsMask: 'ry-popup'
        })
        window.setTimeout(() => {
            this.setState({jsMask: 'ry-popup ry-hidden'}, ()=>{
                this.props.callback && this.props.callback()
            })
        }, 2000);
    }

    close() {
        this.setState({
            jsMask: 'ry-popup ry-hidden'
        })
    }

    render() {
        return (
            <div className={this.state.jsMask}>
                <p><Icon name="ok" /></p>
            </div>
        );
    }
}

export default PopUp
