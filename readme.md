## 写在前面
花几天时间做了个小东西，不得不提，麻雀虽小，但五脏俱全，充分体现出一个全栈工程师在小项目上高效的产出能力 (^-^)。简单介绍下：

## 架构适宜
如果你是一个前端开发工程师，并且懂一点`Node`和数据库。有一天，你的老板逼你快速开发一个移动端的商城加一个管理后台，请不要慌张，装上我的轮子跑跑看。

## 快速搭建
本打算弄个脚手架工具，但是出于教学的目的，还是一步步地告诉大家怎么搭这个全栈式的框架。

### 用`express`生成服务端雏形
会点`Node`的应该对`express`不陌生，模版引擎我习惯使用`ejs`，所以执行下面命令：

```Shell
$ express -e myapp && cd myapp && npm install
```
这样服务端的雏形就有了：
```JavaScript
|----myapp
   |----bin/
   |----node_modules/
   |----public/
   |----routes/
   |----views/
   |----app.js
   |----package.json
```

### 设计和部署数据库
Mac 上推荐使用 `MySQLWorkBench` 设计和管理数据库，当然要是你够牛逼，不用GUI工具也行，直接敲命令也可以玩。设计好数据库表关系之后，导出`.sql`文件并生成数据库。

### `node`连接`mysql`
`node`连接`mysql`需要用的三方的`mysql`库，先安装：

```Shell
$ npm install mysql -save
```

#### 不妨搞个配置文件：`config.db.js`

```JavaScript
/**
 * @desc mysql数据库配置文件
 **/

var config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '你的数据库密码',
    database: '你的数据库名称',
};

module.exports = config;
```

#### 连连看

```JavaScript
var mysql = require('mysql'),
    config = require('./config.db');
var con = mysql.createConnection(config);
```

### 也来耍耍MVC
虽然后端不是强项，但也不能太失水准，设计模式上怎么也搞个MVC，看新的目录结构：

```JavaScript
|----myapp
   ....
   |----database/          /*管理数据模型（即数据模型）*/
      |----config.db.js    /*连接配置*/
      |----user.db.js      /*用户模型，以这个为例*/
   |----route/             /*路由+业务逻辑处理*/
      |----services/       /*业务逻辑处理（即控制器）*/
        |----user.ctrl.js  /*用户控制器，以这个为例*/
        |----index.js      /*默认路由*/
        |----api.js        /*API入口*/
      |----helper.js       /*后端使用的工具方法*/
   |----views/             /*模版文件（即视图）*/
      |----index.ejs       /*前台入口*/
      |----admin.ejs       /*后台入口*/
```

#### `user.db.js`举例   

```JavaScript
/**
 * @desc 用户 数据模型
 * @author Jafeney <692270687@qq.com>
 **/

var mysql = require('mysql'),
    helper = require('../routes/helper'),
    config = require('./config.db');

var con = mysql.createConnection(config);

/*用户模块 构造方法*/
var User = function(user) {
    this.props = user.props  //参数集合，借鉴react设计思想
};

/*获取全部数据,测试接口使用，正式上线时请关闭*/
User.prototype.getUserAllItems = function(callback) {
    var _sql = "select * from user where u_del=0";
    helper.db_query({
        connect: con,
        sql: _sql,
        name: 'getUserAllItems',
        callback: callback
    })
}

module.exports = User
```

#### `helper.js`放什么
其实后端开发过程是用到的工具方法都可以放进去，这里先举例3个常用的（当然有些方法前端也能使用，建议分开存放，方便以后的归并）
```JavaScript
/**
 * @desc 工具模块
 * @author Jafeney <692270687@qq.com>
 **/
var crypto = require('crypto');
module.exports = {
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
    // 执行sql语句
    db_query(opt) {
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
    }
}
```

#### `user.ctrl.js`举例

```JavaScript
/**
 * @desc 用户 控制器
 * @author Jafeney <692270687@qq.com>
 **/

var User = require('../../database/user.db');

module.exports = {
    // 模块初始化
    init: function(app) {
        app.get('/user', this.doGetUserAllItems)
    },
    // 获取所有用户信息
    doGetUserAllItems: function(req, res) {
        var props = {};  //默认参数为空
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
    }
}
```

### 还是前后端分离吧
做前端的时候，最希望看到的就前后端分离和解耦，好吧入乡随俗，也来体验下后端怎么写`restful`接口

#### 配置一层单独的路由
为了区分视图路由和API路由，我们给API提供一层单独的路由，在`app.js`里加这两行：

```JavaScript
var api = require('./routes/api');
app.use('/api', api);
```

#### `api.js`长啥样

```JavaScript
var express = require('express');
var router = express.Router();
var fs = require('fs');

var FS_PATH_SERVICES = './routes/services/';
var REQUIRE_PATH_SERVICES = './services/';

router.options('*', function (req, res, next) {
    next();
});

try {
    var list = fs.readdirSync(FS_PATH_SERVICES);
    for (var e; list.length && (e = list.shift());) {
    	var service = require(REQUIRE_PATH_SERVICES + e);
    	service.init && service.init(router);
    }
} catch(e) {
    console.log(e);
}

module.exports = router;

```

好了，到这里后端算是布置好了，重启node服务，可以测试一下api接口，比如： http://localhost/api/user 去测试用户接口是否正常

## 配置前端工程
前端，是时候表演真正的技术了。抄上咱们的武器：React 、 React-Router 、 Redux 、 ES2015 、Less、Webpack...，向着硝烟奋起！

### React环境搭建
目前国内react和vuex的PK正搞得火热，在我看来同为JS框架，两者的优势其实类似，只要能得心应手地解决实际问题，也无需你死我活。而我React用得比较顺手，这里就以React为例吧。

#### 依赖的`node_modules`

```JavaScript
"dependencies": {
  "babel-polyfill": "^6.16.0",
  "immutable": "^3.8.1",
  "isomorphic-fetch": "^2.2.1",
  "react": "^15.4.1",
  "react-dom": "^15.4.1",
  "react-redux": "^4.4.6",
  "react-redux-spinner": "^0.4.0",
  "react-router": "^3.0.0",
  "react-router-redux": "^4.0.7",
  "redux": "^3.6.0",
  "redux-immutablejs": "0.0.8",
  "redux-logger": "^2.7.4",
  "redux-thunk": "^2.1.0",
},
"devDependencies": {
  "babel-core": "^6.18.2",
  "babel-loader": "^6.2.8",
  "babel-preset-es2015": "^6.18.0",
  "babel-preset-react": "^6.16.0",
  "babel-preset-stage-0": "^6.16.0",
  "css-loader": "^0.26.0",
  "file-loader": "^0.9.0",
  "img-loader": "^1.3.1",
  "less": "^2.7.1",
  "less-loader": "^2.2.3",
  "style-loader": "^0.13.1",
  "url-loader": "^0.5.7",
  "webpack": "^1.13.3"
}
```
### 玩玩babel
### 耍耍webpack
### React-Router怎么玩
### 我的Redux玩法
### 有个得心应手的组件库

## 用git进行托管
## 部署到服务器
