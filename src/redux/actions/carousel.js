/**
 * @desc 轮播 模块的actions
 * @author Jafeney
 * @dateTime 2016-11-29
 **/

import * as TYPES from '../types';
import * as CONFIG from '../../config';
import { request } from './request';
import { bodyUrlencoded } from '../../mixins/helper'

export function getCarousel(opt) {
    return (dispatch) => {
        const route = '/api/carousel';
        const success = (data) => {
            dispatch({ type: TYPES.CAROUSEL_UPDATE, result: {items: data} })
            opt.success && opt.success(data)
        }
        request(route, opt.params || {}, dispatch, success, opt.error)
    }
}

export function updateCarousel(opt) {
    return (dispatch) => {
        const route = '/api/carousel/put';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function deleteCarousel(opt) {
    return (dispatch) => {
        const route = '/api/carousel/del';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function addCarousel(opt) {
    return (dispatch) => {
        const route = '/api/carousel/add';
        request(route, {}, dispatch, opt.success, opt.error,
            { method: 'POST',
                headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: bodyUrlencoded(opt.body) })
    }
}

export function cleanCarousel(opt) {
    return (dispatch) => {
        dispatch({ type: TYPES.CAROUSEL_CLEAN })
    }
}
