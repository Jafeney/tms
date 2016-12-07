/**
 * @desc 网络请求的actions
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import { pendingTask, begin, end } from 'react-redux-spinner'
import 'babel-polyfill'
import fetch from 'isomorphic-fetch'
import * as CONFIG from '../../config'
import * as TYPES from '../types'

export function request(route, params, dispatch, success=null, error=null, { method='GET', headers={}, body=null }={}) {
    // dispatch({ type: TYPES.REQUEST_PEDDING, [pendingTasks]: begin })
    // if (method !== 'GET') dispatch({ type: TYPES.REQUEST_LOADING })
    // 处理query
    const p = params ? '?' + Object.entries(params).map((i) => `${i[0]}=${encodeURI(i[1])}`).join('&') : '';
    const uri = `${ CONFIG.API_URI }${ route }${ p }`;
    let data = { method: method, headers: headers}
    if (method !== 'GET') data.body = body
    console.log(`[${method}]:${uri}`)
    fetch(uri, data)
        .then((response) => {
            // dispatch({ type: TYPES.REQUEST_DONE, [ pendingTasks ]: end})
            if (response.status === 200) {
                return response.json()
            } else {
                return { code: response.status }
            }
        })
        .then((res) => {
            if (res.code === 200) {
                // if (method !== 'GET') dispatch({ type: TYPES.REQUEST_SUCCESS })
                success && success(res.data)
            } else {
                if (res.code === 400) {
                    // dispatch({ type: TYPES.LOGGED_OUT })
                } else {
                    // dispatch({ type: TYPES.REQUEST_ERROR, ...data })
                    error && error(res.message)
                }
            }
        })
        .catch((err) => {
            console.warn(err)
        })
}

export function requestClean() {
    return { type: TYPES.REQUEST_CLEAN }
}
