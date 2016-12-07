/**
 * @desc 产品 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*构造方法*/
var Product = function(page) {
    this.props = page.props
};

/*获取全部数据,正式上线时请关闭*/
Product.prototype.getProductAllItems = function(callback) {
    var _sql = "select * from product where pt_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getProductAllItems',
        callback: callback
    })
}

/*获取页面的全部产品信息*/
Product.prototype.getProductByPageId = function(callback) {
    var _sql = `select * from product where pt_del=0 and page_p_id = ${this.props.pid}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getProductByPageName',
        callback: callback
    })
}

/*更新单条产品的信息*/
Product.prototype.putProductById = function(callback) {
    var _sql = `update product set pt_name='${this.props.name}',pt_price='${this.props.price}',pt_img='${this.props.img}',pt_link='${this.props.link}' where pt_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putProductById',
        callback: callback
    })
}

/*删除单条产品的信息*/
Product.prototype.deleteProductById = function(callback) {
    var _sql = `update product set pt_del=1 where pt_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putProductById',
        callback: callback
    })
}

/*新增一条记录*/
Product.prototype.addProduct = function(callback) {
    var _sql = `insert into product (pt_name, pt_price, pt_img, pt_link, page_p_id, pt_del) values ('${this.props.name}', '${this.props.price}', '${this.props.img}', '${this.props.link}', ${this.props.pid}, 0)`;
    console.log(_sql)
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addProduct',
        callback: callback
    })
}

module.exports = Product
