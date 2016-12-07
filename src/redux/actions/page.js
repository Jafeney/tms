/**
 * @desc 页面模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import * as CONFIG from '../../config';
import { request } from './request';
import { bodyUrlencoded } from '../../mixins/helper'

export function addPage(opt) {
    return (dispatch) => {
        const route = `/api/page/add`;
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: bodyUrlencoded(opt.body) })
    }
}

export function auth(opt) {
    return (dispatch) => {
        const route = `/api/page/auth`;
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: bodyUrlencoded(opt.body) })
    }
}

export function getPageNames(opt) {
    return (dispatch) => {
        const route = '/api/page/name';
        const success = (data) => {
            dispatch({ type: TYPES.PAGE_UPDATE_NAMES, result: {items: data} })
            opt.success && opt.success(data)
        }
        request(route, {}, dispatch, success, opt.error)
    }
}

export function updatePageInfos(opt) {
    return (dispatch) => {
        const route = '/api/page/info';
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: bodyUrlencoded(opt.body) })
    }
}

export function deletePageItem(opt) {
    return (dispatch) => {
        const route = `/api/page/del`;
        request(route, {}, dispatch, opt.success, opt.error, { method: 'POST', headers: {"Content-Type": "application/x-www-form-urlencoded"}, body: bodyUrlencoded(opt.body) })
    }
}

export function updateCurrentPage(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.PAGE_UPDATE_CURRENT, result: opt.data })
    }
}

export function cleanCurrentPage(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.PAGE_CLEAN_CURRENT})
    }
}
