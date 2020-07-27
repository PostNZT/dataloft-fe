import { call, put, takeEvery } from 'redux-saga/effects'

import {
  SET_DEFAULT_CONFIG_REQUEST, GET_DEFAULT_CONFIG_REQUEST,
} from './actions'

function* setDefaultConfigRequest(payload, meta) {

  //payload for setDefaultRequest
  // powergate.ffs.setDefaultConfig(payload.defaultConfig);
  console.log(payload)
}

function* getDefaultConfigRequest(payload, meta) {
  //payload for setDefaultRequest
  // pow.ffs.getDefaultCidConfig(payload.cid)
  console.log(payload)
}

function* watchSetDefaultConfigRequest({ payload, meta }) {
  yield call(setDefaultConfigRequest, payload, meta)
}

function* watchSetDefaultConfigRequest({ payload, meta }) {
  yield call(getDefaultConfigRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(SET_DEFAULT_CONFIG_REQUEST, watchSetDefaultConfigRequest)
  yield takeEvery(GET_DEFAULT_CONFIG_REQUEST, watchGetDefaultConfigRequest)
}