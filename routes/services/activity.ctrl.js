/**
 * @desc 活动 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var Activity = require('../../database/activity.db');
var helper = require('../../routes/helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/activitys', this.doGetActivityAllItems)
        app.get('/activity', this.doGetActivityByPageName)
        app.post('/activity', this.doPutActivityById)
        app.post('/activity/del', this.doDeleteActivityById)
        app.post('/activity/add', this.doAddActivity)
    },

    // 获取所有页面活动信息
    doGetActivityAllItems: function(req, res) {
        var props = {};
        var activity = new Activity({props: props});
        activity.getActivityAllItems(function(err, data) {
            if (data.length >=0) {
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

    // 获取某个页面的活动信息
    doGetActivityByPageName: function(req, res) {
        var props = req.query;
        var activity = new Activity({props: props});
        activity.getActivityByPageId(function(err, data) {
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

    // 更新单条活动信息
    doPutActivityById: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var activity = new Activity({ props: props });
        activity.putActivityById(function(err, data) {
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

    // 删除单条活动信息
    doDeleteActivityById: function(req, res) {
        var props = req.body;
        var activity = new Activity({ props: props });
        activity.deleteActivityById(function(err, data) {
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
    doAddActivity: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var activity = new Activity({props: props});
        activity.addActivity(function(err, data) {
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
                    message: '出错了'
                })
            }
        })
    }
}
