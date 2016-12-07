/**
 * @type Basic Component
 * @desc Icon
 * @author Jafeney
 * @dateTime 2016-07-06
 **/

import React, { Component } from 'react';
import './style.less';

class Button extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name : props.name || null,
            text : props.text || null,
            font : props.font || null,
            color : props.color || null,
            bgColor : props.bgColor || null,
            style : props.style || null,
            className : props.className || null,
            wrapStyle : props.wrapStyle || null,
            wrapClass : props.wrapClass || null,
            textStyle : props.textStyle || null,
            textClass : props.textClass || null,
        }
    }

    changeName(name) {
        name && this.setState({ name: name })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            name : nextProps.name || null,
            text : nextProps.text || null,
            font : nextProps.font || null,
            color : nextProps.color || null,
            bgColor : nextProps.bgColor || null,
            style : nextProps.style || null,
            className : nextProps.className || null,
            wrapStyle : nextProps.wrapStyle || null,
            wrapClass : nextProps.wrapClass || null,
            textStyle : nextProps.textStyle || null,
            textClass : nextProps.textClass || null,
        })
    }

    render() {
        let _className = ['icon'];
        if (this.state.name) { _className.push('icon-' + this.state.name) }

        return (
            <span style={ this.state.wrapStyle } className={ this.state.wrapClass } >
                <i
                    style={{ fontSize: this.state.font, color: this.state.color, backgroundColor: this.state.bgColor, ...this.state.style }}
                    className={ _className.join(' ') + ' ' + (this.state.className ? this.state.className : '') }>
                </i>
                { this.state.text ?
                    <label
                        className={ this.state.textClass }
                        style={{ cursor:'pointer', fontSize: this.state.font, color: this.state.color, ...this.state.textStyle }}>
                        { this.state.text }
                    </label> :
                    null
                }
            </span>
        );
    }
}

export default Button
