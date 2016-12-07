/**
 * @type Other Component
 * @desc 地址选择器
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'
import AddressDate from './citys'

var KEYS = {
    RETURN: 13,
    ESC: 27,
    TAB: 9
};

class AddressPicker extends Component {
    constructor(props) {
        super(props)
        console.log(AddressDate)
        this.state = {
            visible: false,
            tabLevel: 1 ,
            selectedAddress: null,
            hotCitys: [['上海市'], ['浙江省','杭州市'],['北京市'],['天津市'],['辽宁省','沈阳市'],['江苏省','苏州市'],['浙江省','宁波市'],['江西省','南昌市'],['山东省','青岛市'],['湖北省','武汉市'],['广东省','广州市'],['广东省','深圳市'],['广东省','佛山市'],['广东省','东莞市'],['重庆市'],['四川省','成都市']],
            provinces: AddressDate.districts[0].districts.map((x)=> x.name ),
            citys: [],
            districts: [],
        }
        this.selected = {
            province: '',
            city: '',
            district: ''
        };
        this.close = this.close.bind(this);
        this._handleKeyDown = this._handleKeyDown.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.visible !== this.state.visible) {
            if (this.state.visible) {
                document.addEventListener('click', this.close);
                document.addEventListener('keydown', this._handleKeyDown);
            } else {
                document.removeEventListener('click', this.close);
                document.removeEventListener('keydown', this._handleKeyDown);
            }
        }
    }

    componentWillUnmount() {
        if (this.state.visible) {
            document.removeEventListener('click', this.close);
            document.removeEventListener('keydown', this._handleKeyDown);
        }
    }

    _handleKeyDown(e) {
        e.preventDefault();

        switch (e.which) {
            case KEYS.ESC:
            case KEYS.TAB:
                this.close();
                return;
        }
    }

    getIn(nodes) {
        let nextNode = AddressDate.districts[0];
        for (let node of nodes) {
            nextNode = nextNode.districts.find((p)=> p.name == node)
        }
        return nextNode.districts.map((x)=> x.name )
    }

    show(e) {
        this.setState({
            visible: true
        })
    }

    close() {
        if (this.state.visible) {
            this.setState({
                visible: false
            })
        }
    }

    clean() {
        this.setState({
            tabLevel: 1 ,
            selectedAddress: null,
        })
    }

    _updateState() {
        let {province, city, district} = this.selected;
        let districts = city ? this.getIn([province, city]) : []
        let citys = this.getIn([province]);
        let visible = true;
        if (district || (city && districts.length==0)) visible = false;
        let selectedAddress = [province, city, district].filter((x)=> x!='').join('-') || null;
        this.setState({
            tabLevel: districts.length==0 ? 3 : 4,
            citys: citys,
            districts: districts,
            visible: visible,
            selectedAddress: selectedAddress,
        });
        this._emitChange(selectedAddress);
    }

    _handleClick(e, province, city='', district='') {
        e.nativeEvent.stopImmediatePropagation();
        this.selected.province = province;
        this.selected.city = city;
        this.selected.district = district;
        this._updateState();
    }

    _emitChange(value) {
        this.props.onChange(value)
    }

    render() {
        let { selectedAddress, tabLevel, hotCitys, provinces, citys, districts, visible } = this.state;
        return (
            <div className="ry-address-wrapper" style={this.props.style}>
                <input type="text" readOnly={true}
                    className={`input-location ${this.props.inputClassName || ''}`}
                    value={this.props.value || selectedAddress}
                    defaultValue={this.props.defaultValue}
                    onClick={(e) =>{ if (!this.props.disabled) this.show(e) }}
                    disabled={this.props.disabled}
                    placeholder={this.props.placeholder}
                    />
                <span onClick={() => { this.clean() }} className={this.state.selectedAddress && !this.props.closeClear ? "btn-clear" : "ry-hidden"}>清空</span>
                <div className={`address-picker ${!visible && 'ry-hidden'}`}>
                    <div className="_header">
                        <span className={tabLevel===1?"active":""} onClick={(e)=>{ e.nativeEvent.stopImmediatePropagation();this.setState({tabLevel:1}) }}>热门城市</span>
                        <span className={tabLevel===2?"active":""} onClick={(e)=>{ e.nativeEvent.stopImmediatePropagation();this.setState({tabLevel:2}) }}>省份</span>
                        <span className={tabLevel===3?"active":""} onClick={(e)=>{ e.nativeEvent.stopImmediatePropagation();citys.length > 0 && this.setState({tabLevel:3}) }}>城市</span>
                        <span className={tabLevel===4?"active":""}>县区</span>
                    </div>
                    <div className="_mainer">
                        <ul className={`address-list ${tabLevel!==1 && "ry-hidden"}`}>
                            {hotCitys.map((x) =>{ return (<li className="address-item" onClick={(e)=>{this._handleClick(e, ...x)}}>{ x.length > 1 ? x[1] : x[0] }</li>) })}
                        </ul>
                        <ul className={`address-list ${tabLevel!==2 && "ry-hidden"}`}>
                            {provinces.map((x) =>{ return (<li className="address-item" onClick={(e)=>{this._handleClick(e, x)}}>{ x }</li>) })}
                        </ul>
                        <ul className={`address-list ${tabLevel!==3 && "ry-hidden"}`}>
                            {citys.map((x) =>{ return (<li className="address-item" onClick={(e)=>{this._handleClick(e, this.selected.province, x)}}>{ x }</li>) })}
                        </ul>
                        <ul className={`address-list ${tabLevel!==4 && "ry-hidden"}`}>
                            {districts.map((x) =>{ return (<li className="address-item" onClick={(e)=>{this._handleClick(e, this.selected.province, this.selected.city, x)}}>{ x }</li>) })}
                        </ul>
                    </div>
                </div>
            </div>
        );
     }
}

export default AddressPicker
