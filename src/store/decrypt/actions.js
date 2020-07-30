export const DECRYPT_DATA_FILE_REQUEST = 'DECRYPT_DATA_FILE_REQUEST'
export const DECRYPT_DATA_FILE_SUCCESS = 'DECRYPT_DATA_FILE_SUCCESS'
export const DECRYPT_DATA_FILE_FAILURE = 'DECRYPT_DATA_FILE_FAILURE'

export const decryptDataFileRequest = (payload, meta) => ({
  type: DECRYPT_DATA_FILE_REQUEST,
  payload: {

  },
  meta: {
    thunk: true
  }
})

export const decryptDataFileSuccess = (response, meta) => ({
  type: DECRYPT_DATA_FILE_SUCCESS,
  payload: response,
  meta
})

export const decryptDataFileFailure = (error, meta) => ({
  type: DECRYPT_DATA_FILE_FAILURE,
  payload: error,
  meta
})