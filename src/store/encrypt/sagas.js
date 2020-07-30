import { call, put, takeEvery } from 'redux-saga/effects'

import {
  ENCRYPT_DATA_FILE_REQUEST  
} from './actions'


function* encryptDataFileRequest(payload, meta) {
  const { data, filename, key, hint } = payload

  console.log('You have arrived at ENCRYPT')

}

function* watchEncryptDataFileRequest({ payload, meta}) {
  yield call(encryptDataFileRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_DATA_FILE_REQUEST, watchEncryptDataFileRequest)
}