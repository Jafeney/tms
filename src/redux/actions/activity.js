/**
 * @desc 活动 模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import * as CONFIG from '../../config';
import { request } from './request';
import { bodyUrlencoded } from '../../mixins/helper'

export function getActivity(opt) {
    return (dispatch) => {
        const route = '/api/activity';
        const success = (data) => {
            dispatch({ type: TYPES.ACTIVITY_UPDATE, result: {items: data} })
            opt.success && opt.success(data)
        }
        request(route, opt.params || {}, dispatch, success, opt.error)
    }
}

export function updateActivity(opt) {
    return (dispatch) => {
        const route = '/api/activity';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function deleteActivity(opt) {
    return (dispatch) => {
        const route = '/api/activity/del';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function addActivity(opt) {
    return (dispatch) => {
        const route = '/api/activity/add';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function cleanActivity(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.ACTIVITY_CLEAN })
    }
}
