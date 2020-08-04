import {
  GET_METAMASK_ADDRESS_SUCCESS,
  GET_FILECOIN_SIGNED_TRANSACTION_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
    metamask_address: []
  },
  filecoin: {
    signed_transaction: []
  },
})

//should get the tx_ID and make it available on the store

export const register = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_METAMASK_ADDRESS_SUCCESS:
      return state.set('user', payload)
    case GET_FILECOIN_SIGNED_TRANSACTION_SUCCESS:
      return state.set('filecoin', payload)
    default:
      return state
  }
}