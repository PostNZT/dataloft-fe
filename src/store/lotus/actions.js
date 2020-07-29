export const GET_CHAIN_STATE_REQUEST = 'GET_CHAIN_STATE_REQUEST'
export const GET_CHAIN_STATE_SUCCESS = 'GET_CHAIN_STATE_SUCCESS'

export const getChainStateRequest = () => ({
  type: GET_CHAIN_STATE_REQUEST,
  meta: {
    thunk: true,
  }
})

export const getChainStateSuccess = (response, meta) => ({
  type: GET_CHAIN_STATE_SUCCESS,
  payload: response,
  meta,
})
