/**
 * @desc 用户 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var User = require('../../database/user.db');
var Helper = require('../helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/user', this.doGetUserAllItems)
        app.post('/user/token', this.doGetUserItemByPhone)
        app.post('/user/password', this.doPutPassword)
    },

    // 获取所有用户信息
    doGetUserAllItems: function(req, res) {
        var props = {};
        var user = new User({props: props});
        user.getUserAllItems(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data
                })
            } else {
                console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了'
                })
            }
        })
    },

    // 用户登录
    doGetUserItemByPhone: function(req, res) {
        var props = req.body;
        props.password = Helper.getMD5(req.body.password);
        var user = new User({ props: props });
        user.getUserItemByPhone(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: data
                })
            } else {
                console.log(err)
                return res.send({
                    code: 500,
                    message: '用户名或密码不正确'
                })
            }
        })
    },

    // 重置密码
    doPutPassword: function(req, res) {
        var props = {
            id: req.body.id,
            new_password: Helper.getMD5(req.body.new_password),
        };
        var user = new User({ props: props });
        user.putUserPassword(function(err, data) {
            if (data.changedRows >= 0) {
                return res.send({
                    code: 200
                })
            } else {
                console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了'
                })
            }
        })
    }
}
