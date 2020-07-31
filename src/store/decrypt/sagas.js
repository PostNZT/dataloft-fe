import { call, put, takeEvery } from 'redux-saga/effects'
import FileSaver from "file-saver"

import {
  DECRYPT_DATA_FILE_REQUEST,
  decryptDataFileSuccess,
  decryptDataFileFailure
} from './actions'

import {
  decrypt
} from 'services/handleFiles'

function* decryptDataFileRequest(payload, meta) {
  const { fileList, key } = payload
  const decrypted_data = yield call(decrypt, fileList[0], key)
  if (decrypted_data) {
    yield put(decryptDataFileSuccess(decrypted_data, meta))
    FileSaver.saveAs(decrypted_data.file, decrypted_data.name)  
  } else {
    yield put(decryptDataFileFailure(decrypted_data.error))
  }
}

function* watchDecryptDataFileRequest({ payload, meta}) {
  yield call(decryptDataFileRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(DECRYPT_DATA_FILE_REQUEST, watchDecryptDataFileRequest)
}