/**
 * @desc 编辑模块的容器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-02
 **/

import React, { Component } from 'react'
import 'antd/dist/antd.less'
import Carousel from 'antd/lib/carousel'
import Animation from '../../royal/Other/QueueAnimation/'
import Icon from '../../royal/Basic/Icon/'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import PureRenderMixin from '../../mixins/pure-render'
import { getCarousel } from '../../redux/actions/carousel'
import { getActivity } from '../../redux/actions/activity'
import { getProduct } from '../../redux/actions/product'
import { getShortcut } from '../../redux/actions/shortcut'

class Editor extends Component {

    constructor(props) {
        super(props)
        this.pid = props.currentPage.get('id');
        this.state = {
            activeName: window.location.hash.split('/')[window.location.hash.split('/').length-1]
        }
    }

    toPageDetail(link) {
        window.open(link)
    }

    handleRoute(route) {
        this.props.actions.push(`/m/page/editor/${route}`)
        this.setState({
            activeName: route
        })
    }

    load(pid) {
        if (pid) {
            this.props.actions.getCarousel({ params: {pid: pid }})
            this.props.actions.getActivity({ params: {pid: pid }})
            this.props.actions.getProduct({ params: {pid: pid }})
            this.props.actions.getShortcut({ params: {pid: pid }})
            this.pid = pid;
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            activeName: window.location.hash.split('/')[window.location.hash.split('/').length-1]
        })
        if (this.pid !== nextProps.currentPage.get('id')) {
            this.load(nextProps.currentPage.get('id'))
        }
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

    _renderIphone() {
        let { carousel, activity, product, shortcut, currentPage } = this.props;
        return (
            <div className="iphone">
                <div className="iphone-inner">
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
                        <h2 className="title" style={{backgroundColor: currentPage.get('color')}}>精选商品</h2>
                        <ul className="list">{this._renderProductList(product)}</ul>
                    </div>
                </div>
            </div>
        )
    }

    _renderTabHeader() {
        let tabs = [['基本信息','basic'], ['轮播配置','carousel'], ['图标配置', 'shortcut'], ['活动配置','activity'], ['产品配置','product']];
        return tabs.map((item) => {
            return (
                <li onClick={()=>this.handleRoute(item[1])} className={item[1]===this.state.activeName?"ry-active":""}>
                    <span><i className="icon icon-circle-blank"></i> </span>
                    <span>{item[0]}</span>
                </li>
            )
        })
    }

    _renderEditor() {
        let { carousel, activity, product, shortcut } = this.props;
        let { page_name, page_color } = window.localStorage;
        return (
            <div className="editor">
                <div className="ry-tabs">
                    <ul className="ry-tabs-header">
                        {this._renderTabHeader()}
                    </ul>
                    <ul className="ry-tabs-mainer">
                        {this.props.children}
                    </ul>
                </div>
            </div>
        )
    }

    render() {
        let { carousel, activity, product, shortcut } = this.props;
        let error = PureRenderMixin.loadDetection([carousel, activity, product, shortcut]);
        if (error) return error
        return (
            <li className="ry-active">
                {this._renderIphone()}
                {this._renderEditor()}
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        currentPage: state.currentPage,
        carousel: state.carousel,
        activity: state.activity,
        product: state.product,
        shortcut: state.shortcut,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({push, getCarousel, getActivity, getProduct, getShortcut}, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor)
