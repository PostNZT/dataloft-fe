export const ENCRYPT_DATA_FILE_REQUEST = 'ENCRYPT_DATA_FILE_REQUEST'
export const ENCRYPT_DATA_FILE_SUCCESS = 'ENCRYPT_DATA_FILE_SUCCESS'
export const ENCRYPT_DATA_FILE_FAILURE = 'ENCRYPT_DATA_FILE_FAILURE'

export const encryptDataFileRequest = (fileList, key, hint, bucketProfile) => ({
  type: ENCRYPT_DATA_FILE_REQUEST,
  payload: {
    fileList,
    key,
    hint,
    bucketProfile
  },
  meta: {
    thunk: true
  }
})

export const encryptDataFileSuccess = (response, meta) => ({
  type: ENCRYPT_DATA_FILE_SUCCESS,
  payload: response,
  meta,
})

export const encryptDataFileFailure = (error, meta) => ({
  type: ENCRYPT_DATA_FILE_FAILURE,
  payload: error,
  meta,
})