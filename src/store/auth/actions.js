export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE'

export const authenticateUserRequest = (username, password, jwt_token) => ({
  type: AUTHENTICATE_USER_REQUEST,
  payload: {
    username,
    password,
    jwt_token
  },
  meta: {
    thunk: true
  }
})

export const authenticateUserSuccess = (response, meta) => ({
  type: AUTHENTICATE_USER_SUCCESS,
  payload: response,
  meta
})

export const authenticateUserFailure = (error, meta) => ({
  type: AUTHENTICATE_USER_FAILURE,
  payload: error,
  meta
})

export const CREATE_DATALOFT_ACCOUNT_REQUEST = 'CREATE_DATALOFT_ACCOUNT_REQUEST'
export const CREATE_DATALOFT_ACCOUNT_SUCCESS = 'CREATE_DATALOFT_ACCOUNT_SUCCESS'
export const CREATE_DATALOFT_ACCOUNT_FAILURE = 'CREATE_DATALOFT_ACCOUNT_FAILURE'

export const createDataloftAccountRequest = (username, password) => ({
  type: CREATE_DATALOFT_ACCOUNT_REQUEST,
  payload: {
    username,
    password
  },
  meta: {
    thunk: true,
  }
})

export const createDataloftAccountSuccess = (response, meta) => ({
  type: CREATE_DATALOFT_ACCOUNT_SUCCESS,
  payload: response,
  meta,
})

export const createDataloftAccountFailure = (error, meta) => ({
  type: CREATE_DATALOFT_ACCOUNT_FAILURE,
  payload: error,
  meta,
})

export const CREATE_METAMASK_ACCOUNT_REQUEST = 'CREATE_METAMASK_ACCOUNT_REQUEST'
export const CREATE_METAMASK_ACCOUNT_SUCCESS = 'CREATE_METAMASK_ACCOUNT_SUCCESS'
export const CREATE_METAMASK_ACCOUNT_FAILURE = 'CREATE_METAMASK_ACCOUNT_FAILURE'

export const createMetamaskAccountRequest = (username, password, address) => ({
  type: CREATE_METAMASK_ACCOUNT_REQUEST,
  payload: {
    username,
    password,
    address
  },
  meta: {
    thunk: true
  }
})

export const createMetamaskAccountSuccess = (response, meta) => ({
  type: CREATE_METAMASK_ACCOUNT_SUCCESS,
  payload: response,
  meta
})

export const createMetamaskAccountFailure = (error, meta) => ({
  type: CREATE_METAMASK_ACCOUNT_FAILURE,
  payload: error,
  meta
})