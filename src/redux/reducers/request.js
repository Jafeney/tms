/**
 * @desc 网络请求的reducers
 * @author Jafeney <692260687@qq.com>
 * @dateTime 2016-12-23
 **/

import Immutable from 'immutable'
import * as TYPES from '../types'
import { createReducer } from 'redux-immutablejs'

export default createReducer(Immutable.fromJS({status: null, error: null}), {
    [TYPES.REQUEST_LOADING]: (state, action) => {
        return state.merge({
            status: 'loading',
        })
    },
    [TYPES.REQUEST_ERROR]: (state, action) => {
        return state.merge({
            status: 'error',
            code: action.code,
            error: Immutable.fromJS(action.error),
        })
    },
    [TYPES.REQUEST_CLEAN]: (state, action) => {
        return state.merge({
            status: null,
            error: null,
        })
    },
    [TYPES.REQUEST_SUCCESS]: (state, action) => {
        return state.merge({
            status: 'success',
            error: null,
        })
    }
})
