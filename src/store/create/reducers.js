import {
  CREATE_FFS_SUCCESS, 
  CREATE_WALLET_JWT_TOKEN_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
      cids: [],
  },
  jwt_token: {},
})

export const create = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_FFS_SUCCESS:
      return state.set('user', payload)
    case CREATE_WALLET_JWT_TOKEN_SUCCESS:
      return state.set('jwt_token', payload)
    default:
      return state
  }
}