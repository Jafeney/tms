/**
 * @desc reducer和store配置
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as reducers from './reducers'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import { pendingTasksReducer } from 'react-redux-spinner'

export default function configureStore(history, initialState) {

    const reducer = combineReducers({
        ...reducers,
        routing: routerReducer,
        pendingTasks: pendingTasksReducer,
    })

    const loggerMiddleware = createLogger()

    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(
                thunkMiddleware,
                //loggerMiddleware,
                routerMiddleware(history)
            )
        )
    )

    return store
}
