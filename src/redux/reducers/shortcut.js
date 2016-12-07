/**
 * @desc shortcut reducer
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import Immutable from 'immutable';
import * as TYPES from '../types'
import * as CONFIG from '../../config'
import { createReducer } from 'redux-immutablejs'

export const shortcut = createReducer(Immutable.fromJS({preload: false}), {
    [TYPES.SHORTCUT_UPDATE]: (state, action) => {
        return state.set('preload', true).merge(Immutable.fromJS(action.result))
    },
    [TYPES.SHORTCUT_CLEAN]: (state, action) => {
        return state.clear().set('preload', false)
    }
})
