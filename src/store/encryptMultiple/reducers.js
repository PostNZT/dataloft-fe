import {
    ENCRYPT_MULTIPLE_DATA_FILES_SUCCESS, 
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    encrypted_multiple_data: {},
  })
  
  export const encryptMultiple = (state = defaultState, { type, payload }) => {
    switch (type) {
      case ENCRYPT_MULTIPLE_DATA_FILES_SUCCESS:
        return state.set('encrypted_multiple_data', payload)
      default:
        return state
    }
  }