import { call, put, takeEvery } from 'redux-saga/effects'
import * as sigUtil from 'eth-sig-util'

import {
  ENCRYPT_MESSAGE_REQUEST  
} from './actions'


function* encryptMessageRequest(payload, meta) {
  const { encryptedPublicKey, data, version } = payload

  const encryptedMessage = sigUtil.encrypt(
    encryptedPublicKey,
    data,
    version
  )
  
  console.log(encryptedMessage)
}

function* watchEncryptMessageRequest({ payload, meta}) {
  yield call(encryptMessageRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_MESSAGE_REQUEST, watchEncryptMessageRequest)
}