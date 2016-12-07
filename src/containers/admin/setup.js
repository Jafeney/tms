/**
 * @desc 系统设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import QueueAnimation from '../../royal/Other/QueueAnimation/'
import Tabs from '../../royal/Navigation/Tabs/'

class SetUp extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Tabs>
                <Tabs.Pane onClick={()=>console.log('基本设置')} icon="circle-blank" title=" 基本设置">
                    <QueueAnimation speed={'zing'} name="fadeInLeft" style={{width: '100%'}}>

                    </QueueAnimation>
                </Tabs.Pane>
                <Tabs.Pane onClick={()=>console.log('权限设置')} icon="circle-blank" title=" 权限设置">
                    <QueueAnimation speed={'zing'} name="fadeInLeft" style={{width: '100%'}}>

                    </QueueAnimation>
                </Tabs.Pane>
            </Tabs>
        )
    }
}

export default SetUp
