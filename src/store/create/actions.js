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

export const CREATE_WALLET_JWT_TOKEN_REQUEST = 'CREATE_WALLET_JWT_TOKEN_REQUEST'
export const CREATE_WALLET_JWT_TOKEN_SUCCESS = 'CREATE_WALLET_JWT_TOKEN_SUCCESS'
export const CREATE_WALLET_JWT_TOKEN_FAILURE = 'CREATE_WALLET_JWT_TOKEN_FAILURE'

export const createWalletJWTTokenRequest = ( username, password, address, token) => ({
  type: CREATE_WALLET_JWT_TOKEN_REQUEST,
  payload: {
    username,
    password,
    address,
    token,
  },
  meta: {
    thunk: true,
  }
})

export const createWalletJWTTokenSuccess = (response, meta) => ({
  type: CREATE_WALLET_JWT_TOKEN_SUCCESS,
  payload: response,
  meta,
})

export const createWalletJWTTokenFailure = (error, meta) => ({
  type: CREATE_WALLET_JWT_TOKEN_FAILURE,
  payload: error,
  meta,
})