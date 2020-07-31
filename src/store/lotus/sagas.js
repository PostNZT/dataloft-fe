import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_CHAIN_STATE_REQUEST,
} from './actions'

import {
  getClient,
  getChainStats,
} from 'services/api'


function* getChainStateRequest (payload, meta) {
  console.log("it works")
  try{
    const { sig } = payload
    const result = yield call(getChainStats(sig))
    console.log(result)
  }catch (e) {
    console.log(e)
  }


}

function* watchGetChainStateRequest({ payload, meta }) {
  yield call(getChainStateRequest, payload, meta)
}


export default function* sagas() {
  yield takeEvery(GET_CHAIN_STATE_REQUEST, watchGetChainStateRequest)

}
