/**
 * @desc 产品 模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import * as CONFIG from '../../config';
import { request } from './request';
import { bodyUrlencoded } from '../../mixins/helper'

export function getProduct(opt) {
    return (dispatch) => {
        const route = '/api/product';
        const success = (data) => {
            dispatch({ type: TYPES.PRODUCT_UPDATE, result: {items: data} })
            opt.success && opt.success(data)
        }
        request(route, opt.params || {}, dispatch, success, opt.error)
    }
}

export function updateProduct(opt) {
    return (dispatch) => {
        const route = '/api/product';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function deleteProduct(opt) {
    return (dispatch) => {
        const route = '/api/product/del';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function addProduct(opt) {
    return (dispatch) => {
        const route = '/api/product/add';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function cleanProduct(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.PRODUCT_CLEAN })
    }
}
