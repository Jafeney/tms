/**
 * @desc 快速创建React组件的模板
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

let fs = require('fs'),
    source = [
        {
            NAME : 'Checkbox',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '多选框'
        },
        {
            NAME : 'Cascader',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '级联选择'
        },
        {
            NAME : 'DatePicker',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '日期选择'
        },
        {
            NAME : 'Form',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '表单'
        },
        {
            NAME : 'InputNumber',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '数字输入框'
        },
        {
            NAME : 'Input',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '输入框'
        },
        {
            NAME : 'Radio',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '单选框'
        },
        {
            NAME : 'Rate',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '评分'
        },
        {
            NAME : 'Select',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '选择器'
        },
        {
            NAME : 'Slider',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '滑动输入条'
        },
        {
            NAME : 'Switch',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '开关'
        },
        {
            NAME : 'TreeSelect',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '树选择'
        },
        {
            NAME : 'TimePicker',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '时间选择'
        },
        {
            NAME : 'Transfer',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '穿梭框'
        },
        {
            NAME : 'Upload',
            TYPE : 'FormControls',
            AUTHOR : 'Jafeney',
            DATETIME : '2016-07-07',
            DESC: '上传'
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
