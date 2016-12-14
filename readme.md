## 写在前面
花几天时间做了个小东西，不得不提，麻雀虽小，但五脏俱全，充分体现出一个全栈工程师在小项目上高效的产出能力 (^-^)。简单介绍下：

## 架构适宜
如果你是一个前端开发工程师，并且懂一点`Node`和数据库。有一天，你的老板逼你快速开发一个移动端的商城加一个管理后台，请不要慌张，装上我的轮子跑跑看。

## 快速搭建
本打算弄个脚手架工具，但是出于教学的目的，还是一步步地告诉大家怎么搭这个全栈式的框架。

<!--more-->

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
`react`使用`babel`除了安装依赖，`.babelrc`的配置还有个注意点，为了支持JSX和ES2015的最新提案，`presets`需要这么写：

```JavaScript
{ "presets": ["es2015","react","stage-0"] }
```

### 耍耍webpack
`webpack`比`gulp`要好用不少，下面是这个架构下的`webpack.config.js`写法：

```JavaScript
/**
 * @desc 项目webpack配置文件
 * @author Jafeney <692270687@qq.com>
 **/

var webpack = require('webpack');
var path = require('path');
var nodeModulesPath = path.join(__dirname, '/node_modules');

module.exports = {
    entry: {
        admin: './src/entries/admin',
        front: './src/entries/front',
        // 作为外部模块,不打包到webpack的主文件
        vendor: ['react', 'react-dom', 'redux'],
    },
    output: {
        path: path.join(__dirname, '/public/build'),
        publicPath: '/assets/',
        filename: '[name].bundle.js'
    },
    module: {
        noParse: [
            path.join(nodeModulesPath, '/react/dist/react.min'),
            path.join(nodeModulesPath, '/react-dom/dist/react-dom.min'),
            path.join(nodeModulesPath, '/redux/dist/redux.min'),
        ],
        loaders: [
            { test: /\.less$/, loader: 'style!css!less' },
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
            { test: /\.(gif|jpg|png)$/, loader: 'url?limit=8192&name=images/[name].[hash].[ext]' },
            { test: /\.(woff|svg|eot|ttf)$/, loader: 'url?limit=50000&name=fonts/[name].[hash].[ext]' }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }), // 版本上线时开启
        new webpack.optimize.CommonsChunkPlugin('common.js'),  // 抽取公共部分
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ]
}
```

> 注意入口文件有三个：admin、front和vendor。admin是管理后台的入口、front是前台商城的入口、vender则是把react、react-dom、redux这三个大的依赖模块单独抽离成一个文件，这样可以大大减小webpack打包后文件的大小。还有一个技巧是 commonsChunkPlugin() 这个插件，它可以再次抽取输入文件的公共部分，再次减小这三个文件的大小，然后利用浏览器的并行加载能力，稍稍加快整个项目的加载速度。

#### 打包后的模块怎么引？
前面也说到在后端的`Views`目录里**商城主页**和**管理后台**对应的模版视图分别是 `index.ejs` 和 `admin.ejs`，而`webpack`打包好的文件会作为静态资源放在public的build目录下：

商城视图入口 `index.ejs `(移动端)

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title id="page_title">你的网站名称</title>
        <meta name="description" content="你的网站名称" />
        <meta name="keywords" content="商城,福利" />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="telephone=no" name="format-detection" />
        <meta content="email=no" name="format-detection" />
        <meta content="black" name="apple-mobile-web-app-status-bar-style">
        <link rel="shortcut icon" type="image/x-icon" href="http://xiangke.da56.com/static/img/xiangke.ico" media="screen" />
        <link href="http://xiangke.da56.com/static/img/xiangke.ico" rel="apple-touch-icon">
        <link rel="stylesheet" href="http://www.da56.com/static/css/loader.css">
        <script type="text/javascript">
            !function(j){function i(){j.rem=m.getBoundingClientRect().width/16,m.style.fontSize=j.rem+"px"}var p,o=j.navigator.appVersion.match(/iphone/gi)?j.devicePixelRatio:1,n=1/o,m=document.documentElement,l=document.createElement("meta");if(j.dpr=o,j.addEventListener("resize",function(){clearTimeout(p),p=setTimeout(i,300)},!1),j.addEventListener("pageshow",function(b){b.persisted&&(clearTimeout(p),p=setTimeout(i,300))},!1),m.setAttribute("data-dpr",o),l.setAttribute("name","viewport"),l.setAttribute("content","initial-scale="+n+", maximum-scale="+n+", minimum-scale="+n+", user-scalable=no"),m.firstElementChild){m.firstElementChild.appendChild(l)}else{var k=document.createElement("div");k.appendChild(l),document.write(k.innerHTML)}i()}(window);
        </script>
    </head>
    <body>
        <div id="root">
            <div id="floatBarsG">
                <div id="floatBarsG_1" class="floatBarsG"></div>
                <div id="floatBarsG_2" class="floatBarsG"></div>
                <div id="floatBarsG_3" class="floatBarsG"></div>
                <div id="floatBarsG_4" class="floatBarsG"></div>
                <div id="floatBarsG_5" class="floatBarsG"></div>
                <div id="floatBarsG_6" class="floatBarsG"></div>
                <div id="floatBarsG_7" class="floatBarsG"></div>
                <div id="floatBarsG_8" class="floatBarsG"></div>
            </div>
        </div>
        <script src="/build/common.js"></script>
        <script src="/build/vendor.bundle.js"></script>
        <script src="/build/front.bundle.js"></script>
    </body>
</html>
```
> 这里我简要说明一下，上面的 head 部分把移动端适配（包括rem布局）的工作都做了，有了它，移动端你直接就可以用rem进行布局了，具体怎么玩我下面会介绍。

可能有人对 `floatBarsG` 这一层有疑问。这其实是为了解决单页应用加载时的白屏做得CSS3加载动画，配合head的`loader.css`可以有一个不错的加载效果（你可以自己定制一套）。

后台不需要做移动适配，head部分就简单多了：

```HTML
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>管理后台</title>
        <link rel="stylesheet" href="http://www.da56.com/static/css/loader.css">
        <link rel="shortcut icon" href="http://www.da56.com/src/images/icon.ico" />
    </head>
    <body>
        <div id="root">
            <div id="floatBarsG">
                <div id="floatBarsG_1" class="floatBarsG"></div>
                <div id="floatBarsG_2" class="floatBarsG"></div>
                <div id="floatBarsG_3" class="floatBarsG"></div>
                <div id="floatBarsG_4" class="floatBarsG"></div>
                <div id="floatBarsG_5" class="floatBarsG"></div>
                <div id="floatBarsG_6" class="floatBarsG"></div>
                <div id="floatBarsG_7" class="floatBarsG"></div>
                <div id="floatBarsG_8" class="floatBarsG"></div>
            </div>
        </div>
        <script src="/build/vendor.bundle.js"></script>
        <script src="/build/admin.bundle.js"></script>
    </body>
</html>
```

### 我的Redux玩法
`redux`也不是什么神秘的东西啦，不过相比 `flux` 确实好用不少，尤其是处理业务逻辑的能力和对store的管理都比较好用。

#### 前端目录结构

```JavaScript
|----src/                   /*前端代码尽在此目录下*/    
  |----components/          /*项目用到的组件*/
  |----containers/          /*页面容器*/
    |----admin/             /*管理后台的页面容器*/
      |----login.js         /*登录页面容器，以这个为例*/
      |----style.less       /*管理后台样式，统一写在这个less里*/
    |----front/             /*前台商城的页面容器*/
      |----basic/           /*基础样式*/
        |----global.less    /*全局通用样式以及变量*/
        |----reset.less     /*页面初始化的样式*/
        |----size.less      /*字体已经rem配置*/
      |----home.js          /*商城主页容器，以这个为例*/
      |----style.less       /*前台商城的样式，统一写在这个less里*/
  |----entries/             /*入口*/
    |----admin.entry.js     /*后台入口*/
    |----front.entry.js     /*前台入口*/
  |----mixins/              /*混入方法*/
    |----helper.js          /*前端使用的工具方法*/
    |----pure-render.js     /*加载优化*/
  |----redux/               /*redux*/
    |----actions/           /*actions*/
    |----reducers/          /*reducers*/
    |----configStore.js     /*store配置*/
    |----types.js           /*store定义*/
  |----routes/              /*前端路由*/
    |----admin.route.js     /*管理后台路由*/
    |----front.route.js     /*前台商城路由*/
  |----config.js            /*前端配置文件*/
```

#### 关于布局 
PC端随意些，可以用像素布局。这里说说移动端，正好结合 `rem` 说说这套布局的玩法：

前文在 `head` 部分已经给页面的 `html`标签定义了 `data-dpr` 和 `font-size`作为基准单位。 再结合下面这套`less`版的尺寸方案：

```less 
// @desc    提供 750px尺寸的 尺寸 （包括字体大小）的一些常用方法
// 为什么不使用rem 设置字体？
// 参见 https://github.com/imweb/mobile/issues/3
@g-base: 46.875rem;
@g-font-base: 40rem;
.px2px(@name, @px){
    @{name}: round(@px / 2) * 1px;
    [data-dpr="2"] & {
        @{name}: @px * 1px;
    }
    // for mx3
    [data-dpr="2.5"] & {
        @{name}: round(@px * 2.5 / 2) * 1px;
    }
    // for 小米note
    [data-dpr="2.75"] & {
        @{name}: round(@px * 2.75 / 2) * 1px;
    }
    [data-dpr="3"] & {
        @{name}: round(@px / 2 * 3) * 1px
    }
    // for 三星note4
    [data-dpr="4"] & {
        @{name}: @px * 2px;
    }
}
.px2rem(@name, @px) {
    @{name}: (@px / 46.875) * 1rem;
}
//margin,padding, border可以使用这个设置两个值
.mpb(@name, @px, @py) {
    @{name}: (@px / 46.875) * 1rem (@py / 46.875) * 1rem;
}
.fontSize(@px) {
    .px2px(font-size, @px);
}

.size(@thesize) {
    width: @thesize;
    height: @thesize;
}

.size(@width, @height) {
    width: @width;
    height: @height;
}
``` 

大家知道UI给出的移动端设计稿一般是 `2x` 规格的，以 `Iphone6`的375宽度为例，设计给出的一般是750，那么我们在用rem布局时，宽度就是：

```
   750rem/@g-base
```

并且它会自动适配`Iphone`各个尺寸和常用的`Android`屏幕，省时省心。

#### `React-Router`怎么玩
`React-Router`也不神秘，其实就是前端路由的一层封装，配置也很简单。这里因为结合`redux`来使用，所以稍稍有点不同，拿前台商城为例吧：

`front.entry.js`

```JavaScript
/**
 * @desc 商城入口
 * @author Jafeney <692270687@qq.com>
 **/
import React from 'react'
import { render } from 'react-dom'
// redux
import { Provider } from 'react-redux'
// router
import { Router, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import routes from '../routes/front'
import configureStore from '../redux/configureStore'

const store = configureStore(hashHistory)
const history = syncHistoryWithStore(hashHistory, store)

render(
    (
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>
    ), document.getElementById('root')
)

```

`front.route.js`

```JavaScript
/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 **/

import React from 'react'
import { Route } from 'react-router'

import Door from '../containers/front/door'
import Home from '../containers/front/home'

const routes = (
    <Route>
        <Route path="/" component={Door} />
        <Route path="/home" component={Home} />
    </Route>
);

export default routes

```

#### 用`Immutable`管理你的`reducers` 
`Immutable`之前也有单独介绍过，可以提高对象的取值效率，这里主要是和 `reducer` 结合使用，举个例子：

```JavaScript
/**
 * @desc 轮播 reducer
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import { createReducer } from 'redux-immutablejs'

export const carousel = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.CAROUSEL_UPDATE]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.CAROUSEL_CLEAN]: (state, action) => {
        return state.clear().set('preload', false)
    }
})
```

然后我们在页面里可以用 `.get('@name')` 来获取对象的属性。 

> 注意：如果`Immutable`对象是个`List`，必须先`map()`一下，然后再用`get()`方法取值。

### 有个得心应手的组件库 
`React`搞得快一年了，前段时间也自己写了个组件库 `Royal`，不过一直疲于新业务开发，没有很好地整理文档和维护，挺可惜的，不过我开发新项目还是把Royal运用起来，对于有问题的组件进行修改和优化。唉，也是力不从心，期待有人能帮我打理打理吧 ^o^。在此推荐几个时尚的组件库吧：
#### Antd 
蚂蚁金服开发一个比较全面的React组件库，我以前也推荐过，确实蛮不错，唯一的痛点应该是它的源码，学习起来比较费劲。
文档地址： https://ant.design/docs/react/introduce 

#### Material-UI 
UI设计比较酷炫的一款React组件库, 官网地址： http://www.material-ui.com/ 

#### Grommet 
扁平风格的React组件库，官网地址： https://grommet.github.io/

## 用git进行托管 
三方托管代码是个好习惯，有效防止代码丢失或者出错后回滚。

```Shell

/*Git 全局设置*/

$ git config --global user.name "Jafeney"
$ git config --global user.email "692270687@qq.com"

/*创建新版本库*/

$ git clone git@code.aliyun.com:b2b/test.git
$ cd test
$ touch README.md
$ git add README.md
$ git commit -m "add README"
$ git push -u origin master

/*已存在的文件夹或 Git 仓库*/

$ cd existing_folder
$ git init
$ git remote add origin git@code.aliyun.com:b2b/test.git
$ git add .
$ git commit
$ git push -u origin master

```

添加`.gitignore` 阻止node_modules或编译后的文件等进入版本库 

```JavaScript
node_modules
.DS_Store
build
``` 


> 实例项目`github`地址: https://github.com/Jafeney/tms （代码仅供参考，切勿商用）

--- 

@欢迎关注我的 [github](https://github.com/jafeney) 和 [个人博客 －Jafeney](http://jafeney.com)