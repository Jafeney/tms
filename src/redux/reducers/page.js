/**
 * @desc 页面 reducer
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import * as CONFIG from '../../config'
import { createReducer } from 'redux-immutablejs'

export const pages = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.PAGE_UPDATE_INFOS]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.PAGE_CLEAN_INFOS]: (state, action) => {
        return state.clear().set('preload', false)
    }
})

export const pageNames = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.PAGE_UPDATE_NAMES]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.PAGE_CLEAN_NAMES]: (state, action) => {
        return state.clear().set('preload', false)
    }
})

export const currentPage = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.PAGE_UPDATE_CURRENT]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.PAGE_CLEAN_CURRENT]: (state, action) => {
        return state.clear().set('preload', false)
    },
})
