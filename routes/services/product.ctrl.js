/**
 * @desc 产品 控制器
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-29
 **/

var Product = require('../../database/product.db');
var helper = require('../../routes/helper');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/products', this.doGetProductAllItems)
        app.get('/product', this.doGetProductByPageName)
        app.post('/product', this.doPutProductById)
        app.post('/product/del', this.doDeleteProductById)
        app.post('/product/add', this.doAddProduct)
    },

    // 获取所有页面产品信息
    doGetProductAllItems: function(req, res) {
        var props = {};
        var product = new Product({props: props});
        product.getProductAllItems(function(err, data) {
            if (data.length >= 0 ) {
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

    // 获取某个页面的产品信息
    doGetProductByPageName: function(req, res) {
        var props = req.query;
        var product = new Product({props: props});
        product.getProductByPageId(function(err, data) {
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

    // 更新单个产品信息
    doPutProductById: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var product = new Product({props: props});
        product.putProductById(function(err, data) {
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

    // 删除单个产品
    doDeleteProductById: function(req, res) {
        var props = req.body;
        var product = new Product({props: props});
        product.deleteProductById(function(err, data) {
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

    // 添加一个产品
    doAddProduct: function(req, res) {
        var props = req.body;
        props.link = helper.deParseURL(props.link);
        var product = new Product({props: props});
        product.addProduct(function(err, data) {
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
                    message: "出错了"
                })
            }
        })
    }
 }
