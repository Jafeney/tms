/**
 * @type Other Component
 * @desc 加载中
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Spin extends Component {

    constructor() {
        super()
        this.state = {
            jsMask: 'ry-spin ry-hidden'
        }
    }

    show() {
        this.setState({
            jsMask: 'ry-spin'
        })
        window.setTimeout(() => {
            this.setState({jsMask: 'ry-spin ry-hidden'}, ()=>{
                this.props.callback && this.props.callback()
            })
        }, 2000);
    }

    close() {
        this.setState({
            jsMask: 'ry-spin ry-hidden'
        })
    }

    render() {
        return (
            <div className={this.state.jsMask}>
                <div className="ry-animateBox">
                    <div className="ry-cssload-pgloading">
                        <div className="ry-cssload-loadingwrap">
                            <ul className="ry-cssload-bokeh">
                                <li></li>
                                <li></li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Spin
