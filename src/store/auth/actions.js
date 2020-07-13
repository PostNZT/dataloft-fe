export const USER_CREATEFFS_REQUEST = 'USER_CREATEFFS_REQUEST'
export const USER_CREATEFFS_SUCCESS = 'USER_CREATEFFS_REQUEST'
export const USER_CREATEFFS_FAILURE = 'USER_CREATEFFS_FAILURE'

export const userCreateFFSRequest = (address) => ({
  type: USER_CREATEFFS_REQUEST,
  payload: {
    address,
  },
  meta: {
    thunk: true,
  },
})

export const userCreateFFSSuccess = (response, meta) => ({
  type: USER_CREATEFFS_REQUEST,
  payload: response,
  meta,
})

export const userCreateFFSFailure = (error, meta) => ({
  type: USER_CREATEFFS_FAILURE,
  payload: error,
  meta,
})