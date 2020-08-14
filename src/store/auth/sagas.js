import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_DATALOFT_ACCOUNT_REQUEST,
  createDataloftAccountSuccess,
  createDataloftAccountFailure,
  CREATE_METAMASK_ACCOUNT_REQUEST,
  createMetamaskAccountSuccess,
  createMetamaskAccountFailure,
  AUTHENTICATE_DATALOFT_USER_REQUEST,
  authenticateUserSuccess,
  authenticateUserFailure,
  GET_SAVED_USER_REQUEST,
  getSavedUserSuccess,
  SIGNOUT_USER_REQUEST,
  signOutUserSuccess
} from './actions'

import {
  createDataloftAccount,
  createMetamaskAccount,
  authenticateUser
} from 'services/api'

function* getSavedUserRequest(meta) {
  let dataloft_user  = { username: '', hashPass: '', token: '', is_authenticated: false }
  let saved = yield call([localStorage, localStorage.getItem], 'dataloft_user')
  saved  = JSON.parse(saved)
  
  if(saved !== null) {
    dataloft_user = saved
  }

  yield put(getSavedUserSuccess(dataloft_user, meta))
}

function* signOutUser(meta) {
  let dataloft_user = { username: '', hashPass: '', token: '', is_authenticated: false }
  yield call([localStorage, localStorage.clear])
  yield put(signOutUserSuccess(dataloft_user, meta))
}

function* createMetamaskAccountRequest(payload, meta) {
  try {
    const { username, password, address } = payload
    const data = yield call(createMetamaskAccount, username, password, address)

    if (data.response) {
      yield put(createMetamaskAccountSuccess(data.response, meta))
    } else {
      yield put(createMetamaskAccountFailure(data.error))
    }
  } catch (error) {
    yield put(createMetamaskAccountFailure(error))
  }
}

function* createDataloftAccountRequest(payload, meta) {
  try {
    const { username, hashPass, pubEncrypt, encryptedKeys, filecoinTx } = payload
    const data = yield call(createDataloftAccount, username, hashPass, pubEncrypt, encryptedKeys, filecoinTx)
    
    if (data.response) {
      const data_returned = data.response
      yield put(createDataloftAccountSuccess(data_returned, meta))
    } else {
      yield put(createDataloftAccountFailure(data.error))
    }
  } catch (error) {
    yield put(createDataloftAccountFailure(error))
  }
}

function* authenticateUserRequest(payload, meta) {
  const { username, hashPass } = payload
  try {
    const data = yield call(authenticateUser, username, hashPass)

    if (data.response) {
      const { token, is_authenticated } = data.response
      const dataloft_user = { username, hashPass, token, is_authenticated }
      yield call([localStorage, localStorage.clear])
      yield call([localStorage, localStorage.setItem], 'dataloft_user', JSON.stringify(dataloft_user))
      yield put(authenticateUserSuccess(dataloft_user, meta))
    } else {
      yield put(authenticateUserFailure(data.error))
    }
  } catch (error) {

    yield put(authenticateUserFailure(error))
  }
}

function* watchGetSavedUserRequest({ meta }) {
  yield call(getSavedUserRequest, meta)
}

function* watchSignOutUserRequest({ meta }) {
  yield call(signOutUser, meta)
}

function* watchCreateDataloftAccountRequest({ payload, meta }) {
  yield call(createDataloftAccountRequest, payload, meta)
}

function* watchCreateMetamaskAccountRequest({ payload, meta }) {
  yield call(createMetamaskAccountRequest, payload, meta)
}

function* watchAuthenticateUserRequest({ payload, meta }) {
  yield call(authenticateUserRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_SAVED_USER_REQUEST, watchGetSavedUserRequest)
  yield takeEvery(SIGNOUT_USER_REQUEST, watchSignOutUserRequest)
  yield takeEvery(CREATE_DATALOFT_ACCOUNT_REQUEST, watchCreateDataloftAccountRequest)
  yield takeEvery(CREATE_METAMASK_ACCOUNT_REQUEST, watchCreateMetamaskAccountRequest)
  yield takeEvery(AUTHENTICATE_DATALOFT_USER_REQUEST, watchAuthenticateUserRequest)
}
