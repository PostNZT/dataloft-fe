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
} from './actions'

import {
  createDataloftAccount,
  createMetamaskAccount,
  authenticateUser
} from 'services/api'

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
    const { username, pubEncrypt, encryptedKeys, filecoinTx } = payload
    const data = yield call(createDataloftAccount, username, pubEncrypt, encryptedKeys, filecoinTx)
    
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
  try {
    const { username, password } = payload
    const data = yield call(authenticateUser, username, password)

    if (data.response) {
      const data_returned = data.response
      yield put(authenticateUserSuccess(data_returned, meta))
    } else {
      yield put(authenticateUserFailure(data.error))
    }
  } catch (error) {
    yield put(authenticateUserFailure(error))
  }
}

/** 
 * SHOULD BE IMPLEMENTED ON REGISTER
*/
// function* getMetamaskAddressRequest(payload, meta) {
//   try{
//     const { address } = payload
//     const data = yield call(getMetamaskAddress, address)

//     if (data.resolve) {
//       yield put(getMetamaskAddressSuccess(data.resolve, meta))
//     } else {
//       yield put(getMetamaskAddressFailure(data.error))
//     }
//   } catch (error) {
//     yield put(getMetamaskAddressFailure(error))
//   }
// }

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
  yield takeEvery(CREATE_DATALOFT_ACCOUNT_REQUEST, watchCreateDataloftAccountRequest)
  yield takeEvery(CREATE_METAMASK_ACCOUNT_REQUEST, watchCreateMetamaskAccountRequest)
  yield takeEvery(AUTHENTICATE_DATALOFT_USER_REQUEST, watchAuthenticateUserRequest)
}
