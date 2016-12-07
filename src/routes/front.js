/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
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
