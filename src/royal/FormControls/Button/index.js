/**
 * @type Base Component
 * @desc Button
 * @author Jafeney
 * @dateTime 2016-07-03
 **/

import React, { Component } from 'react';
import Icon from '../../Basic/Icon/'
import './style.less';

class Button extends Component {

    constructor(props) {
        super(props);
        this.callback = props.callback || null;
        this.state = {
            type : ['primary', 'default', 'secondary', 'ghost'].find((item) => item === props.type) || 'default',
            size : ['large', 'small'].find((item) => item === props.size) || null,
            text : props.text,
            icon : props.icon,
            shape : ['circle'].find((item) => item === props.shape) || null,
            wrapStyle : props.wrapStyle,
            wrapClass : props.wrapClass,
            width : props.width || null,
            style : props.style || null,
            className : props.className || null,
            disabled : !!props.disabled || false,
        }
    }

    _renderText() {
        if (this.state.text && this.state.icon) {
            return (<span>{' ' + this.state.text}</span>)
        }
        if (this.state.text && !this.state.icon) {
            return (<span>{this.state.text}</span>);
        }
    }

    render() {
        let _className = ['ry-btn'];
        _className.push('ry-btn-' + this.state.type);
        if (this.state.size) { _className.push('ry-btn-' + this.state.size) }
        if (this.state.shape) { _className.push('ry-btn-' + this.state.shape) }
        if (this.state.disabled) { _className.push('disabled') }
        return (
            <span style={ this.state.wrapStyle } className={ this.state.wrapClass }>
                <button
                    onClick={()=>{ this.callback && this.callback() }} type="button"
                    disabled={ this.state.disabled }
                    style={{ width:this.state.width, ...this.state.style }}
                    className={ _className.join(' ') + ' ' + (this.state.className ? this.state.className : '') }>
                        { this.state.icon ? <Icon name={this.state.icon} />: null }
                        { this._renderText() }
                </button>
            </span>
        );
    }
}

export default Button
