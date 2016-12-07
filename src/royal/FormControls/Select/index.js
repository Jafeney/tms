/**
 * @type FormControls Component
 * @desc 选择器
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Select extends Component {

    constructor(props) {
        super(props)
        this.onChange = props.onChange || null,
        this.state = {
            name: props.name || null,
            disabled: props.disabled || false,
            wrapStyle: props.wrapStyle || null,
            wrapClass: props.wrapClass || null,
            style: props.style || null,
            className: props.className || null,
            textClass: props.textClass || null,
            textStyle: props.textStyle || null,
        }
    }

    render() {
        let state = this.state;
        return (
            <span className={state.wrapClass} style={state.wrapStyle}>
                <label style={state.textStyle} className={"ry-select-label " + (state.textClass?state.textClass: '')}>{state.name}</label>
                <select onChange={(e) => this.onChange && this.onChange(e.target.value)} disabled={state.disabled} className={"ry-select " + (state.className?state.className:'')} style={state.style}>
                    { this.props.children }
                </select>
            </span>
        )
    }
}

class Option extends Component {

    constructor(props) {
        super(props)
        this.state = {
            disabled: props.disabled || false,
            value : props.value || null,
            style : props.style || null,
            className: props.className || null,
            checked: props.checked || false,
        }
    }

    render() {
        let state = this.state;
        return (
            <option checked={state.checked} disabled={state.disabled} className={state.className} style={state.style}>
                {state.value}
            </option>
        );
    }
}

export { Select, Option }
