import { call, put, takeEvery } from 'redux-saga/effects'

import {
  CREATE_FFS_REQUEST,
  createFFSSuccess,
  createFFSFailure,

} from './actions'

import {
  createFFS,
} from 'services/api'

function* createFFSRequest(payload, meta) {
  try {
    const { address } = payload
    const data = yield call(createFFS, address)

    if (data.response) {
      yield put(createFFSSuccess(data.response, meta))
    } else {
      yield put(createFFSFailure(data.error))
    }
  } catch(error) {
    yield put(createFFSFailure(error))
  }
}

function* watchCreateFFSRequest({ payload, meta}) {
  yield call(createFFSRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
}