import { call, put, takeEvery } from 'redux-saga/effects'

import {
    ENCRYPT_MULTIPLE_DATA_FILES_REQUEST  
} from './actions'


function* encryptMultipleDataFilesRequest(payload, meta) {
  const { data, filename, key, hint } = payload

  console.log('You have arrived at ENCRYPT MULTIPLE')

}

function* watchEncryptMultipleDataFilesRequest({ payload, meta}) {
  yield call(encryptMultipleDataFilesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_MULTIPLE_DATA_FILES_REQUEST, watchEncryptMultipleDataFilesRequest)
}