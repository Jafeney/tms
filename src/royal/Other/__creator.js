/**
 * @desc 快速创建React组件的模板
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

let fs = require('fs'),
    source = [
        {
            NAME : 'AddressPicker',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '地址选择器'
        },
        {
            NAME : 'Affix',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '固钉'
        },
        {
            NAME : 'BackTop',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '置顶'
        },
        {
            NAME : 'Drag',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '可拖拽容器'
        },
        {
            NAME : 'LocaleProvider',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '国际化'
        },
        {
            NAME : 'QueueAnimation',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '进出场动画'
        },
        {
            NAME : 'Spin',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '加载中'
        },
        {
            NAME : 'Markdown',
            TYPE : 'Other',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '编辑器'
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
