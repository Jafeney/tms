/**
 * @type FormControls Component
 * @desc 单选框
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Radio extends Component {

    constructor(props) {
        super(props)
        this.onConfirm = props.onConfirm || null;
        this.onCancel = props.onCancel || null;

        this.state = {
            text : props.text || null,
            wrapStyle : props.wrapStyle || null,
            wrapClass : props.wrapClass || null,
            textStyle : props.textStyle || null,
            textClass : props.textClass || null,
            style : props.style || null,
            className : props.className || null,
            disabled : props.disabled || false,
            checked : props.checked || false,
        }
    }

    onToggle() {
        this.setState({ checked: !this.state.checked })
        if (this.state.checked) {
            this.onCancel && this.onCancel()
        } else {
            this.onConfirm && this.onConfirm()
        }
    }

    render() {
        let _className = this.state.className ? "ry-radio" + this.state.className : "ry-radio";
        _className = this.state.checked ? _className + " ry-checked" : _className;
        return (
            <label className={ "ry-radio-wrapper " + (this.state.wrapClass ? this.state.wrapClass : '') + (this.state.disabled ? " ry-disabled" : '') } style={ this.state.wrapStyle } >
                <span className={ _className }>
                    <span className={ "ry-radio-inner " + (this.state.className ? this.state.className : '') } style={ this.state.style }></span>
                    <input type="radio" value="on" onClick={()=> !this.state.disabled && this.onToggle() } disabled={this.state.disabled} className="ry-radio-input"  />
                </span>
                <span className={ "ry-radio-text " + (this.state.textClass ? this.state.textClass : '') } style={ this.state.textStyle }>{ this.state.text }</span>
            </label>
        );
    }
}

class RadioGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: props.name || null
        }
    }

    render() {
        return (
            <span>
                { this.props.children }
            </span>
        );
    }
}

export { Radio, RadioGroup }
