/**
 * @desc shortcut 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*构造方法*/
var Shortcut = function(page) {
    this.props = page.props
};

/*获取全部数据,正式上线时请关闭*/
Shortcut.prototype.getShortcutAllItems = function(callback) {
    var _sql = "select * from shortcut where s_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getShortcutAllItems',
        callback: callback
    })
}

/*获取页面的全部图标信息*/
Shortcut.prototype.getShortcutByPageId= function(callback) {
    var _sql = `select * from shortcut where s_del=0 and page_p_id = ${this.props.pid}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getShortcutByPageName',
        callback: callback
    })
}

/*编辑图标信息*/
Shortcut.prototype.putShortcutById = function(callback) {
    var _sql = `update shortcut set s_name='${this.props.name}',s_color='${this.props.color}',s_link='${this.props.link}',s_icon='${this.props.icon}' where s_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putShortcutById',
        callback: callback
    })
}

/*删除图标*/
Shortcut.prototype.deleteShortcutById = function(callback) {
    var _sql = `update shortcut set s_del = 1 where s_id = ${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deleteShortcutById',
        callback: callback
    })
}

/*添加一条记录*/
Shortcut.prototype.addShortcut = function(callback) {
    var _sql = `insert into shortcut (s_name, s_color, s_link, s_icon, page_p_id, s_del) values ('${this.props.name}','${this.props.color}','${this.props.link}','${this.props.icon}',${this.props.pid},0)`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addShortcut',
        callback: callback
    })
}

module.exports = Shortcut
