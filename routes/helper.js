/**
 * @desc 工具模块
 **/

var crypto = require('crypto');

var helper = {

    // 获取本地时间字符串
    getTimeString: function(date) {
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' +
            date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +
            ':' + date.getSeconds();
    },

    // MD5加密
    getMD5: function(str) {
        var md5 = crypto.createHash('md5');
        md5.update(str);
        return md5.digest('hex');
    },

    // HTML片段转义
    html_encode: function(str) {
        var s = "";
        if (str.length === 0) {
            return "";
        }
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    },

    // HTML片段反转义
    html_decode: function(str) {
        var s = "";
        if (str.length === 0) {
            return "";
        }
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    },

    // 执行sql语句
    db_query: function(opt) {
        opt.connect.query(opt.sql, function(err, res) {
    		if (err) {
    			console.log(`${opt.name} err: + ${err}`);
    		} else {
    			console.log(`${opt.name} success!`);
    			if (typeof(opt.callback) === 'function') {
    				opt.callback(err, res);
    			}
    		}
    	});
    },

    // 反处理URL
    deParseURL:  function(url) {
        return url.replace(/\*/g, '&')
    }

};

module.exports = helper;
