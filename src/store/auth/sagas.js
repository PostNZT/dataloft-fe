import { call, put, takeEvery } from 'redux-saga/effects'

import {
  AUTHENTICATE_USER_REQUEST,
  CREATE_METAMASK_ACCOUNT_REQUEST
} from './actions'

import {
  createMetamaskAccount,
} from 'services/api'

function* authenticateUserRequest(payload, meta) {
  try {
    // const { username, password, jwt_token } = payload

    //create a logic for the auth

  } catch (error) {
    console.log(error)
  }
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


function* watchAuthenticateUserRequest(payload, meta) {
  yield call(authenticateUserRequest, payload, meta)
}

function* watchCreateMetamaskAccountRequest(payload, meta) {
  yield call(createMetamaskAccountRequest(payload, meta))
}

export default function* sagas() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticateUserRequest)
  yield takeEvery(CREATE_METAMASK_ACCOUNT_REQUEST, watchCreateMetamaskAccountRequest)
}
