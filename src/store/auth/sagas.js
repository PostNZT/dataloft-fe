import { call, put, takeEvery } from 'redux-saga/effects'

import {
  AUTHENTICATE_USER_REQUEST,
} from './actions'


function* authenticateUserRequest(payload, meta) {
  try {
    const { username, password, jwt_token } = payload

    //create a logic for the auth

  } catch (error) {
    console.log(error)
  }
}


function* watchAuthenticateUserRequest(payload, meta) {
  yield call(authenticateUserRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(AUTHENTICATE_USER_REQUEST, watchAuthenticateUserRequest)
}