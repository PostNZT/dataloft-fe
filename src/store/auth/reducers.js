import {
  CREATE_DATALOFT_ACCOUNT_SUCCESS,
  AUTHENTICATE_DATALOFT_USER_SUCCESS,
  GET_SAVED_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  dataloft_user: {
    username: '',
    hashPass: '',
    token: '',
    is_authenticated: false
  },
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_SAVED_USER_SUCCESS:
      return state.set('dataloft_user', payload)
    case SIGNOUT_USER_SUCCESS:
      return state.set('dataloft_user', payload)
    case CREATE_DATALOFT_ACCOUNT_SUCCESS:
      return state.set('dataloft_user', payload)
    case AUTHENTICATE_DATALOFT_USER_SUCCESS:
      return state.set('dataloft_user', payload)
    default:
      return state
  }
}
