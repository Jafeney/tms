/**
 * @desc 页面 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var Carousel = require('../../database/carousel.db');
var helper = require('../../routes/helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/carousels', this.doGetCarouselAllItems)
        app.get('/carousel', this.doGetCarouselByPageName)
        app.post('/carousel/put', this.doPutCarouselById)
        app.post('/carousel/del', this.doDeleteCarouselById)
        app.post('/carousel/add', this.doAddCarousel)
    },

    // 获取所有页面Carousel信息
    doGetCarouselAllItems: function(req, res) {
        var props = {};
        var carousel = new Carousel({props: props});
        carousel.getCarouselAllItems(function(err, data) {
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

    // 获取某个页面的Carousel信息
    doGetCarouselByPageName: function(req, res) {
        var props = req.query;
        var carousel = new Carousel({props: props});
        carousel.getCarouselByPageId(function(err, data) {
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

    // 更新一条Carousel信息
    doPutCarouselById: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var carousel = new Carousel({props: props});
        carousel.putCarouselById(function(err, data) {
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

    // 删除一条carousel信息
    doDeleteCarouselById: function(req, res) {
        var props = req.body;
        var carousel = new Carousel({props: props});
        carousel.deleteCarouselById(function(err, data) {
            if (data.changedRows >=0) {
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
    doAddCarousel: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var carousel = new Carousel({props: props});
        carousel.addCarousel(function(err, data) {
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
