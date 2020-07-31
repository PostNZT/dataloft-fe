import { call, put, takeEvery } from 'redux-saga/effects'
import FileSaver from "file-saver"

import {
    ENCRYPT_MULTIPLE_DATA_FILES_REQUEST,
    encryptMultipleDataFilesSuccess,
    encryptMultipleDataFilesFailure  
} from './actions'

import {
  encrypt,
  combineToZip
} from 'services/handleFiles'

function* encryptMultipleDataFilesRequest(payload, meta) {
  const { fileList, key, hint } = payload
  const filename = 'dataloft-package.zip'

  const data = yield call (combineToZip, fileList)
  if (data) {
    const encrypted_data = yield call(encrypt, data, filename, key, hint)
    FileSaver.saveAs(encrypted_data.file, encrypted_data.name)
    yield put(encryptMultipleDataFilesSuccess(data, meta))
  } else {
    yield put(encryptMultipleDataFilesFailure(data.error))
  }


}

function* watchEncryptMultipleDataFilesRequest({ payload, meta}) {
  yield call(encryptMultipleDataFilesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_MULTIPLE_DATA_FILES_REQUEST, watchEncryptMultipleDataFilesRequest)
}