import {
    DECRYPT_DATA_FILE_SUCCESS, 
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    decrypted_data: {},
  })
  
  export const decrypt = (state = defaultState, { type, payload }) => {
    switch (type) {
      case DECRYPT_DATA_FILE_SUCCESS:
        return state.set('decrypted_data', payload)
      default:
        return state
    }
  }