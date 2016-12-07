/**
 * @desc 项目路由设置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React from 'react'
import { Route } from 'react-router'

import Login from '../containers/admin/login'
import Main from '../containers/admin/main'
import Editor from '../containers/admin/editor'
import Basic from '../containers/admin/basic'
import Carousel from '../containers/admin/carousel'
import Activity from '../containers/admin/activity'
import Shortcut from '../containers/admin/shortcut'
import Product from '../containers/admin/product'
import Pages from '../containers/admin/pages'

const routes = (
    <Route>
        <Route path="/" component={Login} />
        <Route path='m' component={Main} >
            <Route path="page" component={Pages}>
                <Route path="editor" component={Editor} >
                    <Route path="basic" component={Basic} />
                    <Route path="carousel" component={Carousel} />
                    <Route path="activity" component={Activity} />
                    <Route path="shortcut" component={Shortcut} />
                    <Route path="product" component={Product} />
                </Route>
            </Route>
        </Route>
    </Route>
)

export default routes
