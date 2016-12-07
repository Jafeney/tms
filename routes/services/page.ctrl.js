/**
 * @desc 页面 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var Page = require('../../database/page.db');
var helper = require('../../routes/helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.post('/page/add', this.doAddPageItem)
        app.get('/pages', this.doGetPageAllItems)
        app.get('/page/name', this.doGetPageAllNames)
        app.post('/page/auth', this.doAuth)
        app.post('/page/info', this.doPutPageBasic)
        app.post('/page/del', this.doDeletePage)
        app.get('/page/:pid', this.doGetPageItemById)
    },

    // 新增一个企业
    doAddPageItem: function(req, res) {
        var props = req.body;
        var page = new Page({props});
        page.addPageItem(function(err, data) {
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
    },

    // 获取所有页面信息
    doGetPageAllItems: function(req, res) {
        var props = {};
        var page = new Page({props: props});
        page.getPageAllItems(function(err, data) {
            if (data.length > 0) {
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

    // 获取所有页面的名称
    doGetPageAllNames: function(req, res) {
        var props = {};
        var page = new Page({props: props});
        page.getPageAllNames(function(err, data) {
            if (data.length > 0) {
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

    // 根据企业ID获取企业的信息
    doGetPageItemById: function(req, res) {
        var props = {
            pid: req.params.pid,
        };
        var page = new Page({props: props});
        page.getPageItemById(function(err, data) {
            if (data.length > 0) {
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

    // 验证企业信息和邀请码是否匹配
    doAuth: function(req, res) {
        var props = req.body;
        var page = new Page({props: props});
        page.authNameCode(function(err, data) {
            if (data.length) {
                return res.send({
                    code: 200,
                    data: {
                        page_name: data[0].p_name,
                        page_color: data[0].p_color,
                        page_id: data[0].p_id,
                        page_code: data[0].p_code,
                    }
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

    // 更新企业基本信息
    doPutPageBasic: function(req, res) {
        var props = req.body;
        var page = new Page({props: props});
        page.putPageItemById(function(err, data) {
            if (data.changedRows >= 0) {
                return res.send({
                    code: 200,
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

    // 逻辑删除企业
    doDeletePage: function(req, res) {
        var props = req.body;
        var page = new Page({props: props});
        page.deletePageItemById(function(err, data) {
            if (data.changedRows >= 0) {
                return res.send({
                    code: 200,
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
