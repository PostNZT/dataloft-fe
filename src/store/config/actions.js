export const SET_DEFAULT_CONFIG_REQUEST = 'SET_DEFAULT_CONFIG_REQUEST'
export const SET_DEFAULT_CONFIG_SUCCESS = 'SET_DEFAULT_CONFIG_SUCCESS'
export const SET_DEFAULT_CONFIG_FAILURE = 'SET_DEFAULT_CONFIG_FAILURE'

export const setDefaultConfigRequest = (payload, meta) => ({
  type: SET_DEFAULT_CONFIG_REQUEST,
  payload: {

  },
  meta: {
    thunk: true
  }
})

export const setDefaultConfigSuccess = (response, meta) => ({
  type: SET_DEFAULT_CONFIG_SUCCESS,
  payload: response,
  meta
})

export const setDefaultConfigFailure = (error, meta) => ({
  type: SET_DEFAULT_CONFIG_FAILURE,
  payload: error,
  meta
})

export const GET_DEFAULT_CONFIG_REQUEST = 'GET_DEFAULT_CONFIG_REQUEST'
export const GET_DEFAULT_CONFIG_SUCCESS = 'GET_DEFAULT_CONFIG_REQUEST'
export const GET_DEFAULT_CONFIG_FAILURE = 'GET_DEFAULT_CONFIG_FAILURE'

export const getDefaultConfigRequest = (payload, meta) => ({
  type: GET_DEFAULT_CONFIG_REQUEST,
  payload: {

  },
  meta: {
    thunk: true
  }
})

export const getDefaultConfigSuccess = (response, meta) => ({
  type: GET_DEFAULT_CONFIG_SUCCESS,
  oayload: response,
  meta
})

export const getDefaultConfigFailure = (error, meta) => ({
  type: GET_DEFAULT_CONFIG_FAILURE,
  payload: error,
  meta
})