import {
  CREATE_DATALOFT_ACCOUNT_SUCCESS,
  AUTHENTICATE_DATALOFT_USER_REQUEST
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  dataloft_user: {
    token:'',
    is_authenticated: false
  },
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_DATALOFT_ACCOUNT_SUCCESS:
      return state.set('dataloft_user', payload)
    case AUTHENTICATE_DATALOFT_USER_REQUEST:
      return state.set('dataloft_user', payload)
    default:
      return state
  }
}
