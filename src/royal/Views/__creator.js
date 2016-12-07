/**
 * @desc 快速创建React组件的模板
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

let fs = require('fs'),
    source = [
        {
            NAME : 'Alert',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '提示警告'
        },
        {
            NAME : 'Badge',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '徽标数'
        },
        {
            NAME : 'Calendar',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '日历'
        },
        {
            NAME : 'Card',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '卡片'
        },
        {
            NAME : 'Carousel',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '走马灯'
        },
        {
            NAME : 'Collapse',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '折叠面板'
        },
        {
            NAME : 'Dropdown',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '下拉菜单'
        },
        {
            NAME : 'Message',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '全局提示'
        },
        {
            NAME : 'Modal',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '对话框'
        },
        {
            NAME : 'Notification',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '通知提示框'
        },
        {
            NAME : 'PopConfirm',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '气泡确认框'
        },
        {
            NAME : 'PopOver',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '气泡卡片'
        },
        {
            NAME : 'Progress',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '进度条'
        },
        {
            NAME : 'Table',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '表格'
        },
        {
            NAME : 'Tag',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '标签'
        },
        {
            NAME : 'Timeline',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '时间轴'
        },
        {
            NAME : 'Tooltip',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '文字提示'
        },
        {
            NAME : 'Tree',
            TYPE : 'Views',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '树形控件'
        },
    ];

source.forEach((item) => {
    fs.mkdir('./' + item.NAME, (err) => {
        let _jsFile = './' + item.NAME + '/index.js',
            _styleFile = './' + item.NAME + '/style.less';
        if (!err) {
            // write index.js
            fs.appendFileSync( _jsFile, '/**' + '\n' )
            fs.appendFileSync( _jsFile, ' * @type ' + item.TYPE + ' Component' + '\n' )
            fs.appendFileSync( _jsFile, ' * @desc ' + item.DESC + '\n' )
            fs.appendFileSync( _jsFile, ' * @author ' + item.AUTHOR + '\n' )
            fs.appendFileSync( _jsFile, ' * @dateTime ' + item.DATETIME + '\n' )
            fs.appendFileSync( _jsFile, ' **/' + '\n' )
            fs.appendFileSync( _jsFile, '\n' )
            fs.appendFileSync( _jsFile, "import React, { Component } from 'react' " + '\n' )
            fs.appendFileSync( _jsFile, "import './style.less'" + '\n' )
            fs.appendFileSync( _jsFile, '\n' )
            fs.appendFileSync( _jsFile, "class " + item.NAME + " extends Component {" + '\n' )
            fs.appendFileSync( _jsFile, '\n' )
            fs.appendFileSync( _jsFile, "    constructor(props) {" + '\n' )
            fs.appendFileSync( _jsFile, "        super(props)" + '\n' )
            fs.appendFileSync( _jsFile, "    }" + '\n' )
            fs.appendFileSync( _jsFile, '\n' )
            fs.appendFileSync( _jsFile, "    render() {" + '\n' )
            fs.appendFileSync( _jsFile, "        return (<span>" + item.DESC + "</span>)" + '\n' )
            fs.appendFileSync( _jsFile, "    }" + '\n' )
            fs.appendFileSync( _jsFile, "}" + '\n' )
            fs.appendFileSync( _jsFile, '\n' )
            fs.appendFileSync( _jsFile, "export default " + item.NAME + '\n' )

            // write style.less
            fs.appendFileSync( _styleFile, '/**' + '\n' )
            fs.appendFileSync( _styleFile, ' * @desc ' + item.NAME + ' Component的样式 \n' )
            fs.appendFileSync( _styleFile, ' * @author ' + item.AUTHOR + '\n' )
            fs.appendFileSync( _styleFile, ' * @dateTime ' + item.DATETIME + '\n' )
            fs.appendFileSync( _styleFile, ' **/' + '\n' )
            fs.appendFileSync( _styleFile, '\n' )

            fs.appendFileSync( _styleFile, ".ry-" + item.NAME.toLowerCase() + " {}" + '\n' )
        }
    })
})
