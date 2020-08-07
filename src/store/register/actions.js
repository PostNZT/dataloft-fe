export const GET_METAMASK_ADDRESS_REQUEST = 'GET_METAMASK_ADDRESS_REQUEST'
export const GET_METAMASK_ADDRESS_SUCCESS = 'GET_METAMASK_ADDRESS_SUCCESS'
export const GET_METAMASK_ADDRESS_FAILURE = 'GET_METAMASK_ADDRESS_FAILURE'

export const getMetamaskAddressRequest = (address) => ({
  type: GET_METAMASK_ADDRESS_REQUEST,
  payload: {
    address
  },
  meta: {
    thunk: true
  }
})

export const getMetamaskAddressSuccess = (response, meta) => ({
  type: GET_METAMASK_ADDRESS_SUCCESS,
  payload: response,
  meta
})

export const getMetamaskAddressFailure = (error, meta) => ({
  type: GET_METAMASK_ADDRESS_FAILURE,
  payload: error,
  meta
})

export const GET_FILECOIN_SIGNED_TRANSACTION_REQUEST = 'GET_FILECOIN_SIGNED_TRANSACTION_REQUEST'
export const GET_FILECOIN_SIGNED_TRANSACTION_SUCCESS = 'GET_FILECOIN_SIGNED_TRANSACTION_SUCCESS'
export const GET_FILECOIN_SIGNED_TRANSACTION_FAILURE = 'GET_FILECOIN_SIGNED_TRANSACTION_FAILURE'

export const getFilecoinSignedTransactionRequest = (signed_transaction) => ({
  type: GET_FILECOIN_SIGNED_TRANSACTION_REQUEST,
  payload: {
    signed_transaction
  },
  meta: {
    thunk: true
  }
})

export const getFilecoinSignedTransactionSuccess = (response, meta) => ({
  type: GET_FILECOIN_SIGNED_TRANSACTION_SUCCESS,
  payload: response,
  meta
})

export const getFilecoinSignedTransactionFailure = (error, meta) => ({
  type: GET_FILECOIN_SIGNED_TRANSACTION_FAILURE,
  payload: error,
  meta
})
