/**
 * @desc 商城入口
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
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
