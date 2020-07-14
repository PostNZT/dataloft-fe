import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { createPow } from '@textile/powergate-client'
import config from 'config'

import {
  CREATE_FFS_REQUEST
} from './actions'

function* createFFSRequest(payload, meta) {
  const { address } = payload
  const powergate = config.POW_HOST

  
  console.log(powergate)
  console.log('you are here')
  console.log(address)
  

}

function* watchCreateFFSRequest({ payload, meta}) {
  yield call(createFFSRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
}