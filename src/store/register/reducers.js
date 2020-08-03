import {
  GET_FILECOIN_TRANSACTION_ID_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  metamask_address: {},
  filecoin: {
    transaction_id: []
  },
})

//should get the tx_ID and make it available on the store

export const register = (state = defaultState, { type, payload }) => {
  switch (type) {
    case GET_FILECOIN_TRANSACTION_ID_SUCCESS:
      return state.set('filecoin', payload)
    default:
      return state
  }
}