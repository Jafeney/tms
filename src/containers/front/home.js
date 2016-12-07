/**
 * @desc 商城主页
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import 'antd/dist/antd.less';
import Carousel from 'antd/lib/carousel'

import Icon from '../../royal/Basic/Icon/'
import Animation from '../../royal/Other/QueueAnimation/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PureRenderMixin from '../../mixins/pure-render'
import { getCarousel } from '../../redux/actions/carousel'
import { getActivity } from '../../redux/actions/activity'
import { getProduct } from '../../redux/actions/product'
import { getShortcut } from '../../redux/actions/shortcut'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        let page_name = window.localStorage.page_name || '中国电信';
        document.getElementById('page_title').innerHTML = `有福企业内购平台-${page_name}`;
        this.props.actions.getCarousel({ params: {page_name: page_name }})
        this.props.actions.getActivity({ params: {page_name: page_name }})
        this.props.actions.getProduct({ params: {page_name: page_name }})
        this.props.actions.getShortcut({ params: {page_name: page_name }})
    }

    _renderCarousel(carousels) {
        let _carousels = carousels.get('items');
        if (_carousels.size > 0) {
            return _carousels.map((item)=>
                <div className="banner-box">
                    <img className="banner-img" onClick={()=>this.toPageDetail(item.get('c_link'))} src={item.get('c_img')} />
                </div>
            )
        }
    }

    _renderShortCuts(shortcuts) {
        let _shortcuts = shortcuts.get('items');
        if (_shortcuts.size > 0) {
            return _shortcuts.map((item) =>
                <li className="item" onClick={()=>this.toPageDetail(item.get('s_link'))}>
                    <Icon name={item.get('s_icon')} wrapClass="icon" wrapStyle={{backgroundColor: item.get('s_color')}} />
                    <p className="label">{item.get('s_name')}</p>
                </li>
            )
        }
    }

    _renderProductList(products) {
        let _products = products.get('items');
        if (_products.size > 0) {
            return _products.map((item, idx) => {
                return (
                    <li className="item" onClick={()=>this.toPageDetail(item.get('pt_link'))}>
                        <img className="img" src={item.get('pt_img')} />
                        <p className="name">{item.get('pt_name')}</p>
                        <p className="price">¥{item.get('pt_price')}</p>
                    </li>
                )
            })
        }
    }

    _renderActivityList(activitys) {
        let _activitys = activitys.get('items');
        if (_activitys.size > 0) {
            return _activitys.map((item, idx) => {
                return (
                    <li className="item" onClick={()=>this.toPageDetail(item.get('a_link'))}>
                        <img src={item.get('a_img')} className="img" />
                        <p className="title">
                            <span className="tag">惠</span>
                            <span className="txt">{item.get('a_title')}</span>
                        </p>
                    </li>
                )
            })
        }
    }

    toPageDetail(link) {
        window.location.href = link;
    }

    render() {
        let { carousel, activity, product, shortcut } = this.props;
        let error = PureRenderMixin.loadDetection([carousel, activity, product, shortcut]);
        if (error) return error
        return (
            <Animation style={{display: 'block'}} name="rotateIn" speed='fast' className="home">
                <div className="banner">
                    <Carousel effect="fade" autoplay dots={false}>
                        {this._renderCarousel(carousel)}
                    </Carousel>
                </div>
                <div className="shortcuts">
                    <ul className="list">{this._renderShortCuts(shortcut)}</ul>
                </div>
                <div className="activitys">
                    <ul className="list">{this._renderActivityList(activity)}</ul>
                </div>
                <div className="products">
                    <h2 className="title" style={{backgroundColor: window.localStorage.page_color || '#f15b6c'}}>精选商品</h2>
                    <ul className="list">{this._renderProductList(product)}</ul>
                </div>
            </Animation>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        carousel: state.carousel,
        activity: state.activity,
        product: state.product,
        shortcut: state.shortcut,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({push, getCarousel, getActivity, getProduct, getShortcut}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
