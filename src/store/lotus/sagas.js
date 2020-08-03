import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_SIGN_MESSAGE_REQUEST,
  getSignMessageSuccess, 
  getSignMessageFailure
} from './actions'

import {
  getSignMessage,
} from 'services/api'

function* getSignMessageRequest (payload, meta) {
  try{
    const { sig } = payload
    const data = yield call(getSignMessage, sig)
    if (data) {
      console.log("Success")
      yield put(getSignMessageSuccess(data, meta))
    } else {
      console.log("Failure")
      yield put(getSignMessageFailure(data.error))
    }
  }catch (error) {
    console.log("Failure2")
    yield put(getSignMessageFailure(error))
  }
}

function* watchgetSignMessageRequest({ payload, meta }) {
  yield call(getSignMessageRequest, payload, meta)
}


export default function* sagas() {
  yield takeEvery(GET_SIGN_MESSAGE_REQUEST, watchgetSignMessageRequest)
}
