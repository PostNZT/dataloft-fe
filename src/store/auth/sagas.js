import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_DATALOFT_ACCOUNT_REQUEST,
  createDataloftAccountSuccess,
  createDataloftAccountFailure,
  CREATE_METAMASK_ACCOUNT_REQUEST,
  createMetamaskAccountSuccess,
  createMetamaskAccountFailure,
  GET_METAMASK_ADDRESS_REQUEST,
  getMetamaskAddressSuccess,
  getMetamaskAddressFailure,
} from './actions'

import {
  createDataloftAccount,
  createMetamaskAccount,
  getMetamaskAddress,
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

export default function* sagas() {
  yield takeEvery(CREATE_DATALOFT_ACCOUNT_REQUEST, watchCreateDataloftAccountRequest)
  yield takeEvery(CREATE_METAMASK_ACCOUNT_REQUEST, watchCreateMetamaskAccountRequest)
}
