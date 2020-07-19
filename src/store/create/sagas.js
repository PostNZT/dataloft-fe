import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_FFS_REQUEST,
  createFFSSuccess,
  createFFSFailure,
  CREATE_WALLET_JWT_TOKEN_REQUEST,
  createWalletJWTTokenSuccess,
  createWalletJWTTokenFailure
} from './actions'

import {
  createFFS,
  createWalletJWTToken,
} from 'services/api'

function* createFFSRequest(payload, meta) {
  try {
    const { address } = payload
    const data = yield call(createFFS, address)

    if (data.response) {
      yield put(createFFSSuccess(data.response, meta))
    } else {
      yield put(createFFSFailure(data.error))
    }
  } catch(error) {
    yield put(createFFSFailure(error))
  }
}

function* createWalletJWTTokenRequest(payload, meta) {
  try {
    const { username, password, address, token } = payload
    const data = yield call(createWalletJWTToken, username, password, address, token)
    
    if (data.response) {
      yield put(createWalletJWTTokenSuccess(data.response, meta))
    } else {
      yield put(createWalletJWTTokenFailure(data.error))
    }
  } catch (error) {
    yield put(createWalletJWTTokenFailure(error))
  }
}

function* watchCreateFFSRequest({ payload, meta }) {
  yield call(createFFSRequest, payload, meta)
}

function* watchCreateWalletJWTTokenRequest({ payload, meta }) {
  yield call(createWalletJWTTokenRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
  yield takeEvery(CREATE_WALLET_JWT_TOKEN_REQUEST, watchCreateWalletJWTTokenRequest)
}