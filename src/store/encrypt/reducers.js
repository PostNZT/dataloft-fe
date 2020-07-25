import {
    ENCRYPT_MESSAGE_SUCCESS, 
  } from './actions'
  import { fromJS } from 'immutable'
  
  const defaultState = fromJS({
    encrypted_account = {}
  })
  
  export const create = (state = defaultState, { type, payload }) => {
    switch (type) {
      case ENCRYPT_MESSAGE_SUCCESS:
        return state.set('encrypted_account', payload)
      default:
        return state
    }
  }