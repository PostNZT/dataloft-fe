import { call, put, takeEvery } from 'redux-saga/effects'

import {
  DECRYPT_DATA_FILE_REQUEST  
} from './actions'


function* decryptDataFileRequest(payload, meta) {
  const { data, filename, key, hint } = payload

  console.log('You have arrived at DECRYPT')

}

function* watchDecryptDataFileRequest({ payload, meta}) {
  yield call(decryptDataFileRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(DECRYPT_DATA_FILE_REQUEST, watchDecryptDataFileRequest)
}