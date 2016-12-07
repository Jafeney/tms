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
var Page = function(page) {
    this.props = page.props
};

/*添加一条数据*/
Page.prototype.addPageItem = function(callback) {
    var _sql = `insert into page (p_name, p_code, p_del, p_color) values ('${this.props.name}','${this.props.code}',0,'${this.props.color}')`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addPageItem',
        callback: callback
    })
}

/*获取全部数据,正式上线时请关闭*/
Page.prototype.getPageAllItems = function(callback) {
    var _sql = "select * from page where p_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getPageAllItems',
        callback: callback
    })
}

/*获取全部页面的名称*/
Page.prototype.getPageAllNames = function(callback) {
    var _sql = "select p_id,p_name,p_color,p_code from page where p_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getPageAllNames',
        callback: callback
    })
}

/*根据企业名称获取企业的邀请码*/
Page.prototype.getPageItemById = function(callback) {
    var _sql = `select * from page where p_del=0 and p_id=${this.props.pid}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getPageItemById',
        callback: callback
    })
}

/*匹配企业名称和邀请码是否正确*/
Page.prototype.authNameCode = function(callback) {
    var _sql = `select * from page where p_del=0 and p_name='${this.props.name}' and p_code='${this.props.code}'`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'authNameCode',
        callback: callback
    })
}

/*修改企业基本信息*/
Page.prototype.putPageItemById = function(callback) {
    var _sql = `update page set p_name='${this.props.new_name}',p_color='${this.props.new_color}',p_code='${this.props.new_code}' where p_id=${this.props.page_id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putPageItemByName',
        callback: callback
    })
}

/*删除企业(逻辑删除)*/
Page.prototype.deletePageItemById = function(callback) {
    var _sql = `update page set p_del=1 where p_id=${this.props.page_id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deletePageItemById',
        callback: callback,
    })
}

module.exports = Page
