import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'

import {
  CREATE_FFS_REQUEST
} from './actions'

import {
  createFFS,
} from 'services/api'

function* createFFSRequest(payload, meta) {
  const { address } = payload
  const data = yield call(createFFS, address)
  console.log(data)

  // if (data.response) {

  // }
}

function* watchCreateFFSRequest({ payload, meta}) {
  yield call(createFFSRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
}