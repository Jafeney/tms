/**
 * @desc 优化渲染
 **/
import React from 'react'
import Immutable from 'immutable'

export default {
    deepCompare: (self, nextProps, nextState) => {
        return !Immutable.is(self.props, nextProps) || !Immutable.is(self.state, nextState)
    },
    loadDetection: (reducers=[])=> {
        for (let r of reducers) {
            if (!r.get('preload')) return (<div />)
        }
    }
}
