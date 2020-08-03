import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_FILECOIN_TRANSACTION_ID_REQUEST,
  getFilecoinTransactionIdSuccess,
  getFilecoinTransactionIdFailure
} from './actions'


function* getFilecoinTransactionIdRequest(payload, meta) {
  const { transaction_id } = payload

  if (transaction_id) {
    yield put(getFilecoinTransactionIdSuccess({transaction_id: [transaction_id]}, meta))
  } else {
    yield put(getFilecoinTransactionIdFailure(transaction_id.error, meta))
  }
}

function* watchGetFilecoinTransactionIdRequest({ payload, meta}) {
  yield call(getFilecoinTransactionIdRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_FILECOIN_TRANSACTION_ID_REQUEST, watchGetFilecoinTransactionIdRequest)
}