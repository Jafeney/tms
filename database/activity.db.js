/**
 * @desc 活动 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*构造方法*/
var Activity = function(page) {
    this.props = page.props
};

/*获取全部数据,正式上线时请关闭*/
Activity.prototype.getActivityAllItems = function(callback) {
    var _sql = "select * from activity where a_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getActivityAllItems',
        callback: callback
    })
}

/*获取页面的全部活动信息*/
Activity.prototype.getActivityByPageId = function(callback) {
    var _sql = `select * from activity where a_del=0 and page_p_id = ${this.props.pid}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getActivityByPageName',
        callback: callback
    })
}

/*更新单条活动信息*/
Activity.prototype.putActivityById = function(callback) {
    var _sql = `update activity set a_img='${this.props.img}',a_link='${this.props.link}',a_title='${this.props.title}' where a_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putActivityById',
        callback: callback
    })
}

/*删除单条活动信息*/
Activity.prototype.deleteActivityById = function(callback) {
    var _sql = `update activity set a_del=1 where a_id=${this.props.id}`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'deleteActivityById',
        callback: callback
    })
}

/*添加一条记录*/
Activity.prototype.addActivity = function(callback) {
    var _sql = `insert into activity (a_img, a_link, a_title, a_del, page_p_id) values ('${this.props.img}', '${this.props.link}', '${this.props.title}', 0, ${this.props.pid})`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'addActivity',
        callback: callback,
    })
}

module.exports = Activity
