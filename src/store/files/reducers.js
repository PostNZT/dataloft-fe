import {
    GET_BUCKET_IDENTITY_SUCCESS, 
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    bucketIdentity: {},
  })
  
  export const files = (state = defaultState, { type, payload }) => {
    switch (type) {
      case GET_BUCKET_IDENTITY_SUCCESS:
        return state.set('bucketIdentity', payload)
      default:
        return state
    }
  }