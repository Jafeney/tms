/**
 * @type FormControls Component
 * @desc 输入框
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import Icon from '../../Basic/Icon/'
import './style.less'

class Input extends Component {

    constructor(props) {
        super(props)

        this.onBlur = props.onBlur || null;

        this.state = {
            value : props.value || null,
            checkedStatus : props.checkedStatus || null,
            checkedText : props.checkedText || null,
            disabled : props.disabled || false,
            name : props.name || null,
            defaultValue : props.defaultValue || null,
            placeholder : props.placeholder || null,
            className : props.className || null,
            style : props.style || null,
            textClass : props.textClass || null,
            textStyle : props.textStyle || null,
            wrapClass : props.wrapClass || null,
            wrapStyle : props.wrapStyle || null,
        }
    }

    setValue(value) {
        this.setState({
            value: value
        })
    }

    getValue() {
        return this.refs.input.value
    }

    handleTextChange(text) {
        this.setState({ value: text })
        this.props.onChange && this.props.onChange(text)
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value : nextProps.value || null,
            checkedStatus : nextProps.checkedStatus || null,
            checkedText : nextProps.checkedText || null,
            disabled : nextProps.disabled || false,
            name : nextProps.name || null,
            defaultValue : nextProps.defaultValue || null,
            placeholder : nextProps.placeholder || null,
            className : nextProps.className || null,
            style : nextProps.style || null,
            textClass : nextProps.textClass || null,
            textStyle : nextProps.textStyle || null,
            wrapClass : nextProps.wrapClass || null,
            wrapStyle : nextProps.wrapStyle || null,
        })
    }

    render() {
        return (
            <span className={this.state.wrapClass} style={this.state.wrapStyle}>
                <label
                    style={this.state.textStyle}
                    className={"ry-input-name" + (this.state.textClass ? " " + this.state.textClass : "")}>
                    {this.state.name}
                </label>
                <input
                    style={this.state.style}
                    disabled={this.state.disabled}
                    value={this.state.value}
                    type="text"
                    ref="input"
                    className={"ry-input" + (this.state.className ? " " + this.state.className : "")}
                    onChange ={(text)=>this.handleTextChange(text.target.value)}
                    onBlur = {this.onBlur && ((text)=>this.onBlur(text.target.value))}
                    defaultValue={this.state.defaultValue}
                    placeholder={this.state.placeholder} />
                <span
                    className={"ry-input-checked " + (this.state.checkedStatus? "ry-" + this.state.checkedStatus : '') }>
                    <Icon name="ok" className="ry-input-checked-ok" />
                    <label className="ry-input-checked-fail">{this.state.checkedText}</label>
                </span>
            </span>
        )
    }
}

export default Input
