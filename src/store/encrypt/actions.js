export const ENCRYPT_MESSAGE_REQUEST = 'ENCRYPT_MESSAGE_REQUEST'
export const ENCRYPT_MESSAGE_SUCCESS = 'ENCRYPT_MESSAGE_SUCCESS'
export const ENCRYPT_MESSAGE_FAILURE = 'ENCRYPT_MESSAGE_FAILURE'

export const encryptMessageRequest = (encryptedPublicKey, data, version) => ({
  type: ENCRYPT_MESSAGE_REQUEST,
  payload: {
    encryptedPublicKey,
    data,
    version
  },
  meta: {
    thunk: true
  }
})

export const encryptMessageSuccess = (response, meta) => ({
  type: ENCRYPT_MESSAGE_SUCCESS,
  payload: response,
  meta,
})

export const encryptMessageFailure = (error, meta) => ({
  type: ENCRYPT_MESSAGE_FAILURE,
  payload: error,
  meta,
})