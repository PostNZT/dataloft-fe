export const CREATE_FFS_REQUEST = 'CREATE_FFS_REQUEST'
export const CREATE_FFS_SUCCESS = 'CREATE_FFS_SUCCESS'
export const CREATE_FFS_FAILURE = 'CREATE_FFS_FAILURE'

export const createFFSRequest = (address) => ({
  type: CREATE_FFS_REQUEST,
  payload: {
    address,
  },
  meta: {
    thunk: true,
  }
})

export const createFFSSuccess = (response, meta) => ({
  type: CREATE_FFS_SUCCESS,
  payload: response,
  meta,
})

export const createFFSFailure = (error, meta) => ({
  type: CREATE_FFS_FAILURE,
  payload: error,
  meta
})