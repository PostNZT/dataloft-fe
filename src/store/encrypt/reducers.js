import {
  ENCRYPT_DATA_FILE_SUCCESS, 
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  encrypted_data: {},
})

export const encrypt = (state = defaultState, { type, payload }) => {
  switch (type) {
    case ENCRYPT_DATA_FILE_SUCCESS:
      return state.set('encrypted_data', payload)
    default:
      return state
  }
}