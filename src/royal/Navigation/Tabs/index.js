/**
 * @type Navigation Component
 * @desc 标签页
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import Icon from '../../Basic/Icon/'
import './style.less'

class Tabs extends Component {

    constructor(props) {
        super(props)
        this.panels = this.props.children;
        this.state = {
            tabSelected: []
        }
        for (let i = 0; i < this.panels.length ; i++) {
            this.state.tabSelected.push(this.panels[i].props.selected);
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('tabs')
    }

    switchTab(i) {
        let _arr = [];
        this.state.tabSelected.map((item,ii)=>{
            _arr.push(i===ii)
        })
        this.state.tabSelected.map((item,ii) => this.setState({tabSelected: _arr}))
        this.panels[i].props.onClick && this.panels[i].props.onClick()
    }

    _renderHeader() {
        return this.panels.map((item,i) => [
            <li className={this.state.tabSelected[i] ? 'ry-active': ''}
                onClick={()=>this.switchTab(i)}>
                <Icon name={item.props.icon} />
                <span>{item.props.title}</span>
            </li>
        ])
    }

    _renderMainer() {
        return this.panels.map((item,i) => [
            <li className={this.state.tabSelected[i] ? 'ry-active': ''}>
                {item.props.children}
            </li>
        ])
    }

    render() {
        return (
            <div className={"ry-tabs " + this.props.className}>
                <ul className="ry-tabs-header">
                    {this._renderHeader()}
                </ul>
                <ul className="ry-tabs-mainer">{this._renderMainer()}</ul>
            </div>
        )
    }
}

class Pane extends Tabs {
    constructor(props) {
        super(props)
        this.state = {
            ref: props.ref || null,
            title: props.title || null,
            icon: props.icon || null,
            selected: props.selected || false,
            onClick: props.onClick || null,
        }
    }

    componentWillReceiveProps(nextProps) {
        console.log('panel')
    }

    render() {
        return (<div>{this.props.children}</div>)
    }
}

export default Tabs
