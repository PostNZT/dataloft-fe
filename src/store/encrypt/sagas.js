import { call, put, takeEvery } from 'redux-saga/effects'

import {
  encrypt,
  fileToData
} from 'services/handleFiles'

import {
  ENCRYPT_DATA_FILE_REQUEST,
  encryptDataFileSuccess,
  encryptDataFileFailure
} from './actions'


function* encryptDataFileRequest(payload, meta) {
  try {
    const { fileList, key, hint } = payload
    const { name: filename } = fileList[0]
   
    const data = yield call (fileToData, fileList[0])
    if (data) {
      const encrypted_data = yield call(encrypt, data, filename, key, hint)
      const dataInfo = { filename, key, hint, base64: encrypted_data.file }
      yield put(encryptDataFileSuccess(dataInfo, meta))
    } else {
      yield put(encryptDataFileFailure(data.error))
    }
  } catch (error) {
    yield put(encryptDataFileFailure(error))
  }
}

function* watchEncryptDataFileRequest({ payload, meta}) {
  yield call(encryptDataFileRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_DATA_FILE_REQUEST, watchEncryptDataFileRequest)
}