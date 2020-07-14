import {
  CREATE_FFS_SUCCESS,
} from './actions'
import { fromJS } from 'immutable'

const defaultState = fromJS({
  user: {
      cids: [],
  }
})

export const create = (state = defaultState, { type, payload }) => {
  switch (type) {
    case CREATE_FFS_SUCCESS:
      return state.set('user', payload)
    default:
      return state
  }
}