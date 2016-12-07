/**
 * @desc 用户 数据模型
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*用户模块 构造方法*/
var User = function(user) {
    this.props = user.props
};

/*获取全部数据,正式上线时请关闭*/
User.prototype.getUserAllItems = function(callback) {
    var _sql = "select * from user where u_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getUserAllItems',
        callback: callback
    })
}

/*根据手机号码获取用户的信息*/
User.prototype.getUserItemByPhone = function(callback) {
    var _sql = `select u_id from user where u_del=0 and u_phone='${this.props.phone}' and u_password='${this.props.password}'`;
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getUserItemByPhone',
        callback: callback
    })
}

/*修改用户登录密码*/
User.prototype.putUserPassword = function(callback) {
    var _sql = `update user set u_password = '${this.props.new_password}' where u_id = ${this.props.id}`;
    console.log(_sql)
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'putUserPassword',
        callback: callback
    })
}

module.exports = User
