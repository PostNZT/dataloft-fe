import {
    CREATE_METAMASK_ACCOUNT_REQUEST
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  metamask_user: {}
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_METAMASK_ACCOUNT_REQUEST:
      return state.set('user', payload)
    default:
      return state
  }
}