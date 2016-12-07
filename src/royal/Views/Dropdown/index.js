/**
 * @type Views Component
 * @desc 下拉菜单
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import Icon from '../../Basic/Icon/'
import QueueAnimation from '../../Other/QueueAnimation/'
import './style.less'

class Dropdown extends Component {

    constructor(props) {
        super(props)
        this.state = {
            style: props.style || null,
            className: props.className || null,
            title: props.title || null,
            dataList: props.dataList || null,
            dropped: props.dropped || false,
        }
        this.renderItem = props.renderItem || null,
        this.icon = props.dropped ? "angle-up" : "angle-down";
        this.close = this.close.bind(this)
    }

    _renderItem(operates) {
        return this.state.dataList.map((item,i) =>
            this.renderItem && this.renderItem(item, operates[i])
        )
    }

    onToggle() {
        let newState = !this.state.dropped
        this.setState({...this.state, dropped: newState})
        let _icon = this.state.dropped ? "angle-down" : "angle-up";
        this.refs.icon.changeName(_icon)
    }

    render() {
        return (
            <div style={this.state.style}
                className={"ry-dropdown " + (this.state.className ? this.state.className : '')} >
                <div className="show-box" onClick={ () => this.onToggle() }>
                    <span className="title">{ this.state.title }</span>
                    <Icon ref="icon"  name={this.icon} />
                </div>
                <ul className={ this.state.dropped ? "drop-list ry-active" : "drop-list" }>
                    <QueueAnimation speed="zing" name="fadeInDown">
                    { this._renderItem(this.props.operates) }
                    </QueueAnimation>
                </ul>
            </div>
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.dropped !== this.state.dropped) {
            if (this.state.dropped) {
                document.addEventListener('click', this.close);
            } else {
                document.removeEventListener('click', this.close);
            }
        }
    }

    componentWillUnmount() {
        if (this.state.dropped) {
            document.removeEventListener('click', this.close);
        }
    }

    close() {
        this.setState({dropped: false})
    }
}

export default Dropdown
