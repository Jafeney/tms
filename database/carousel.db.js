/**
 * @desc 页面 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*构造方法*/
var Carousel = function(page) {
    this.props = page.props
};

/*获取全部轮播数据*/
Carousel.prototype.getCarouselAllItems = function(callback) {
    var _sql = "select * from carousel where c_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getCarouselAllItems',
        callback: callback
    })
}

/*获取页面的全部轮播信息*/
Carousel.prototype.getCarouselByPageId = function(callback) {
    var _sql = `select * from carousel where c_del=0 and page_p_id = ${this.props.pid}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getCarouselAllItems',
        callback: callback
    })
}

/*编辑轮播信息*/
Carousel.prototype.putCarouselById = function(callback) {
    var _sql = `update carousel set c_img='${this.props.img}', c_link='${this.props.link}' where c_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putCarouselById',
        callback: callback
    })
}

/*删除轮播信息*/
Carousel.prototype.deleteCarouselById = function(callback) {
    var _sql = `update carousel set c_del=1 where c_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deleteCarouselById',
        callback: callback
    })
}

/*添加一条记录*/
Carousel.prototype.addCarousel = function(callback) {
    var _sql = `insert into carousel (c_img, c_link, page_p_id, c_del) values ('${this.props.img}', '${this.props.link}', '${this.props.pid}',0)`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addCarousel',
        callback: callback
    })
}

module.exports = Carousel
