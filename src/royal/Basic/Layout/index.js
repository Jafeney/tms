/**
 * @type Base Component
 * @desc Layout
 * @author Jafeney
 * @dateTime 2016-07-06
 **/
import React, { Component } from 'react'
import './style.less'

class Row extends Component {
    constructor(props) {
        super(props)
        this.state = {
            minWidth : this.props.minWidth || null,
            style : this.props.style || null,
            className : this.props.className || null,
        }
    }

    render() {
        let _rowClass = this.state.minWidth ? "ry--row ry-row-" + this.state.minWidth + ' ' : "ry-row ";
        let _className = this.state.className ? _rowClass + this.state.className : _rowClass;
        return (
            <div className={ _className } style={ this.state.style }>
                { this.props.children }
            </div>
        );
    }
}

class Col extends Component {
    constructor(props) {
        super(props)
        this.state = {
            style : this.props.style || null,
            className : this.props.className || null,
        }
    }

    render() {
        let _className = this.state.className ? "ry-col "+ this.state.className : "ry-col";
        return (
            <div className={ _className } style={ this.state.style }>
                { this.props.children } 
            </div>
        );
    }
}

export { Row, Col }
