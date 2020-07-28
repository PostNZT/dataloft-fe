import {
  CREATE_DATALOFT_ACCOUNT_SUCCESS, 
  CREATE_METAMASK_ACCOUNT_SUCCESS
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  dataloft_user: {}
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_DATALOFT_ACCOUNT_SUCCESS:
      return state.set('dataloft_user', payload)
    default:
      return state
  }
}
