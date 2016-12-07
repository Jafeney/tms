/**
 * @desc shortcut 模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import * as CONFIG from '../../config';
import { request } from './request';
import { bodyUrlencoded } from '../../mixins/helper'

export function getShortcut(opt) {
    return (dispatch) => {
        const route = '/api/shortcut';
        const success = (data) => {
            dispatch({ type: TYPES.SHORTCUT_UPDATE, result: {items: data} })
            opt.success && opt.success(data)
        }
        request(route, opt.params || {}, dispatch, success, opt.error)
    }
}

export function updateShortcut(opt) {
    return (dispatch) => {
        const route = '/api/shortcut';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function deleteShortcut(opt) {
    return (dispatch) => {
        const route = '/api/shortcut/del';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function addShortcut(opt) {
    return (dispatch) => {
        const route = '/api/shortcut/add';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function cleanShortcut(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.SHORTCUT_CLEAN })
    }
}
