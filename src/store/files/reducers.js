import {
    GET_DATA_FILES_REQUEST
  } from './actions'
  
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    data: {}
  })
  
  export const files = (state = defaultState, { type, payload }) => {
    switch (type) {
      case GET_DATA_FILES_REQUEST:
        return state.set('data', payload)
      default:
        return state
    }
  }
  