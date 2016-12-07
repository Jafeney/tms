/**
 * @desc 活动 reducer
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import * as CONFIG from '../../config'
import { createReducer } from 'redux-immutablejs'

export const activity = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.ACTIVITY_UPDATE]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.ACTIVITY_CLEAN]: (state, action) => {
        return state.clear().set('preload', false)
    }
})
