import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_FFS_REQUEST,
  createFFSSuccess,
  createFFSFailure,
  CREATE_WALLET_JWT_TOKEN_REQUEST,
  createWalletJWTTokenSuccess,
  createWalletJWTTokenFailure,
  CREATE_DATALOFT_ACCOUNT_REQUEST,
  createDataloftAccountSuccess,
  createDataloftAccountFailure,
} from './actions'

import {
  createFFS,
  createWalletJWTToken,
  createDataloftAccount,
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

function* createDataloftAccountRequest(payload, meta) {
  try {
    const { username, password, address } = payload
    const data = yield call(createDataloftAccount, username, password, address)

    if (data.response) {
      yield put(createDataloftAccountSuccess(data.response, meta))
    } else {
      yield put(createDataloftAccountFailure(data.error))
    }
  } catch (error) {
    yield put(createDataloftAccountFailure(error))
  }
}

function* watchCreateFFSRequest({ payload, meta }) {
  yield call(createFFSRequest, payload, meta)
}

function* watchCreateWalletJWTTokenRequest({ payload, meta }) {
  yield call(createWalletJWTTokenRequest, payload, meta)
}

function* watchCreateDataloftAccountRequest({ payload, meta }) {
  yield call(createDataloftAccountRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
  yield takeEvery(CREATE_WALLET_JWT_TOKEN_REQUEST, watchCreateWalletJWTTokenRequest)
  yield takeEvery(CREATE_DATALOFT_ACCOUNT_REQUEST, watchCreateDataloftAccountRequest)
}