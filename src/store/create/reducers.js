import {
  CREATE_FFS_SUCCESS, CREATE_WALLET_JWT_TOKEN_SUCCESS, CREATE_DATALOFT_ACCOUNT_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
      cids: [],
  },
  jwt_token: {},
  dataloft_account: {}
})

export const create = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_FFS_SUCCESS:
      return state.set('user', payload)
    case CREATE_WALLET_JWT_TOKEN_SUCCESS:
      return state.set('jwt_token', payload)
    case CREATE_DATALOFT_ACCOUNT_SUCCESS:
      return state.set('dataloft_account', payload)
    default:
      return state
  }
}