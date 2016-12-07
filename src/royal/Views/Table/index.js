/**
 * @type Views Component
 * @desc 表格
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import Checkbox from '../../FormControls/Checkbox/'
import './style.less'

class Table extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: props.dataSource || [],
            columns: props.columns || [],
            wrapClass: props.wrapClass || null,
            wrapStyle: props.wrapStyle || null,
            style: props.style || null,
            className: props.className || null,
            needChecked: props.className || false,
        }
        this.renderRow = props.renderRow || null
        this.operates = props.operates || null
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            dataSource: nextProps.dataSource,
        })
    }

    onSelectAll() {
        for (let ref in this.refs) {
            if (ref!=='selectAll') {
                this.refs[ref].setState({checked:true})
            }
        }
    }

    offSelectAll() {
        for (let ref in this.refs) {
            if (ref!=='selectAll') {
                this.refs[ref].setState({checked:false})
            }
        }
    }

    _renderHead() {
        return this.state.columns.map((item,i) => {
            return [<th>{i===0 && this.props.needChecked?<Checkbox ref="selectAll" onConfirm={()=>this.onSelectAll()} onCancel={()=>this.offSelectAll()} />:''}{item.title}</th>]
        })
    }

    _renderBody() {
        let _renderRow = this.renderRow;
        return this.state.dataSource.map((item) => {
            return _renderRow && _renderRow(item, this.operates)
        })
    }

    render() {
        let state = this.state;
        return (
            <div className={state.wrapClass} style={state.wrapStyle}>
                <table
                    border="0"
                    style={state.style}
                    className={"ry-table " + (state.className && state.className : "")}>
                    <thead>
                        <tr>{this._renderHead()}</tr>
                    </thead>
                    <tbody>
                        {this._renderBody()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default Table
