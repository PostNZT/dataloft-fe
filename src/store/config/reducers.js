import {
    SET_DEFAULT_CONFIG_REQUEST
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    ffs_config: {
        cids: [],
    }
  })
  
  export const create = (state = defaultState, { type, payload }) => {
    switch (type) {
      case SET_DEFAULT_CONFIG_REQUEST:
        return state.set('ffs_config', payload)
      default:
        return state
    } 
  }