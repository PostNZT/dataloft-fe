import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_METAMASK_ADDRESS_REQUEST,
  getMetamaskAddressSuccess,
  getMetamaskAddressFailure,
  GET_FILECOIN_SIGNED_TRANSACTION_REQUEST,
  getFilecoinSignedTransactionSuccess,
  getFilecoinSignedTransactionFailure
} from './actions'

function* getMetamaskAddressRequest(payload, meta) {
  try{
    const { address } = payload
    if (address) {
      const result = { metamask_address: address }
      yield put(getMetamaskAddressSuccess(result, meta))
    } else {
      yield put(getMetamaskAddressFailure(address.error, meta))
    }
  } catch (error) {
    yield put(getMetamaskAddressFailure(error))
  }
}

function* getFilecoinSignedTransactionRequest(payload, meta) {
  const { signed_transaction } = payload

  if (signed_transaction) {
    yield put(getFilecoinSignedTransactionSuccess({signed_transaction: [signed_transaction]}, meta))
  } else {
    yield put(getFilecoinSignedTransactionFailure(signed_transaction.error, meta))
  }
}

function* watchGetMetamaskAddressRequest({ payload, meta }) {
  yield call(getMetamaskAddressRequest, payload, meta)
}

function* watchGetFilecoinSignedTransactionRequest({ payload, meta}) {
  yield call(getFilecoinSignedTransactionRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_METAMASK_ADDRESS_REQUEST, watchGetMetamaskAddressRequest)
  yield takeEvery(GET_FILECOIN_SIGNED_TRANSACTION_REQUEST, watchGetFilecoinSignedTransactionRequest)
}