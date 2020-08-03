export const GET_SIGN_MESSAGE_REQUEST = 'GET_SIGN_MESSAGE_REQUEST'
export const GET_CHAIN_STATE_SUCCESS = 'GET_SIGN_MESSAGE_SUCCESS'
export const GET_CHAIN_STATE_FAILURE = 'GET_SIGN_MESSAGE_SUCCESS'

export const getSignMessageRequest = (sig) => ({
  type: GET_SIGN_MESSAGE_REQUEST,
  payload: {
    sig
  },
  meta: {
    thunk: true,
  }
})

export const getSignMessageSuccess = (response, meta) => ({
  type: GET_CHAIN_STATE_SUCCESS,
  payload: response,
  meta,
})

export const getSignMessageFailure = (error, meta) => ({
  type: GET_CHAIN_STATE_FAILURE,
  payload: error,
  meta,
})

