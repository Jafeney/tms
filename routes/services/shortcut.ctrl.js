/**
 * @desc shortcut 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var Shortcut = require('../../database/shortcut.db');
var helper = require('../../routes/helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/shortcuts', this.doGetShortcutAllItems)
        app.get('/shortcut', this.doGetShortcutByPageName)
        app.post('/shortcut', this.doPutShortcutById)
        app.post('/shortcut/add', this.doAddShortcut)
        app.post('/shortcut/del', this.doDeleteShortcut)
    },

    // 获取所有页面图标信息
    doGetShortcutAllItems: function(req, res) {
        var props = {};
        var shortcut = new Shortcut({props: props});
        shortcut.getShortcutAllItems(function(err, data) {
            if (data.length >= 0) {
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

    // 获取某个页面的图标信息
    doGetShortcutByPageName: function(req, res) {
        var props = req.query;
        var shortcut = new Shortcut({props: props});
        shortcut.getShortcutByPageId(function(err, data) {
            if (data.length >= 0) {
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

    // 更新单条图标信息
    doPutShortcutById: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var shortcut = new Shortcut({ props: props });
        shortcut.putShortcutById(function(err, data) {
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
    },

    // 删除图标
    doDeleteShortcut: function(req, res) {
        var props = req.body;
        var shortcut = new Shortcut({ props: props });
        shortcut.deleteShortcutById(function(err, data) {
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
    },

    // 添加一条记录
    doAddShortcut: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var shortcut = new Shortcut({props: props});
        shortcut.addShortcut(function(err, data) {
            if (data.insertId > 0) {
                return res.send({
                    code: 200,
                    data: {
                        id: data.insertId
                    }
                })
            } else {
                console.log(err)
                return res.send({
                    code: 500,
                    message: '出错了',
                })
            }
        })
    }
}
