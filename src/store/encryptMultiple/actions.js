export const ENCRYPT_MULTIPLE_DATA_FILES_REQUEST = 'ENCRYPT_MULTIPLE_DATA_FILES_REQUEST'
export const ENCRYPT_MULTIPLE_DATA_FILES_SUCCESS = 'ENCRYPT_MULTIPLE_DATA_FILES_SUCCESS'
export const ENCRYPT_MULTIPLE_DATA_FILES_FAILURE = 'ENCRYPT_MULTIPLE_DATA_FILES_FAILURE'

export const encryptMultipleDataFilesRequest = (fileList, key, hint) => ({
  type: ENCRYPT_MULTIPLE_DATA_FILES_REQUEST,
  payload: {
    fileList,
    key,
    hint
  },
  meta: {
    thunk: true
  }
})

export const encryptMultipleDataFilesSuccess = (response, meta) => ({
  type: ENCRYPT_MULTIPLE_DATA_FILES_SUCCESS,
  payload: response,
  meta
})

export const encryptMultipleDataFilesFailure = (error, meta) => ({
  type: ENCRYPT_MULTIPLE_DATA_FILES_FAILURE,
  payload: error,
  meta
})