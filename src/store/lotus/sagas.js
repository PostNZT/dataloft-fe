import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_SIGN_MESSAGE_REQUEST,
} from './actions'

import {
  getClient,
  getSignMessage,
} from 'services/api'
import {getSignMessageSuccess, getSignMessageFailure} from "../lotus/actions";



function* getSignMessageRequest (payload, meta) {
  console.log("it works")
  try{
    const { sig } = payload
    const data = yield call(getSignMessage, sig)
    console.log(data)
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
