//SHOULD GET THE TX_ID AND STORE IT GLOBALLY
export const GET_FILECOIN_TRANSACTION_ID_REQUEST = 'GET_FILECOIN_TRANSACTION_ID_REQUEST'
export const GET_FILECOIN_TRANSACTION_ID_SUCCESS = 'GET_FILECOIN_TRANSACTION_ID_SUCCESS'
export const GET_FILECOIN_TRANSACTION_ID_FAILURE = 'GET_FILECOIN_TRANSACTION_ID_FAILURE'

export const getFilecoinTransactionIdRequest = (transaction_id) => ({
  type: GET_FILECOIN_TRANSACTION_ID_REQUEST,
  payload: {
    transaction_id
  },
  meta: {
    thunk: true
  }
})

export const getFilecoinTransactionIdSuccess = (response, meta) => ({
  type: GET_FILECOIN_TRANSACTION_ID_SUCCESS,
  payload: response,
  meta
})

export const getFilecoinTransactionIdFailure = (error, meta) => ({
  type: GET_FILECOIN_TRANSACTION_ID_FAILURE,
  payload: error,
  meta
})
