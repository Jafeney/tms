/**
 * @type FormControls Component
 * @desc 多选框
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Checkbox extends Component {

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
        let _className = this.state.className ? "ry-checkbox" + this.state.className : "ry-checkbox";
        _className = this.state.checked ? _className + " ry-checked" : _className;
        return (
            <label className={ "ry-checkbox-wrapper " + (this.state.wrapClass ? this.state.wrapClass : '') + (this.state.disabled ? " ry-disabled" : '') } style={ this.state.wrapStyle } >
                <span className={ _className }>
                    <span className={ "ry-checkbox-inner " + (this.state.className ? this.state.className : '') } style={ this.state.style }></span>
                    <input type="checkbox" value="on" onClick={()=> !this.state.disabled && this.onToggle() } disabled={this.state.disabled} className="ry-checkbox-input"  />
                </span>
                <span className={ "ry-checkbox-text " + (this.state.textClass ? this.state.textClass : '') } style={ this.state.textStyle }>{ this.state.text }</span>
            </label>
        );
    }
}

export default Checkbox
