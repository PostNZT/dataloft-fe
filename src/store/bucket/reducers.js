import {
    GET_BUCKET_IDENTITY_SUCCESS, 
    GET_BUCKET_DATA_FILES_SUCCESS
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    bucketProfile: {},
    bucketFiles: {}
  })
  
  export const bucket = (state = defaultState, { type, payload }) => {
    switch (type) {
      case GET_BUCKET_IDENTITY_SUCCESS:
        return state.set('bucketProfile', payload)
      case GET_BUCKET_DATA_FILES_SUCCESS:
        return state.set('bucketFiles', payload)
      default:
        return state
    }
  }