import {
  CREATE_DATALOFT_ACCOUNT_SUCCESS,
  GET_METAMASK_ADDRESS_SUCCESS
} from './actions'

import { fromJS } from 'immutable'

const defaultState = fromJS({
  dataloft_user: {},
  metamask_data: {}
})

export const auth = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_DATALOFT_ACCOUNT_SUCCESS:
      return state.set('dataloft_user', payload)
    case GET_METAMASK_ADDRESS_SUCCESS:
      return state.set('metamask_data', payload)
    default:
      return state
  }
}
