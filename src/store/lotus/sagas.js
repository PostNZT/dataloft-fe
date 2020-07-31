import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_CHAIN_STATE_REQUEST,
} from './actions'

import {
  getClient,
  getChainStats,
} from 'services/api'


function* getChainStateRequest (meta) {
  console.log("it works")
  try{
    const result = yield call(getChainStats)
    console.log(result)
  }catch (e) {
    console.log(e)
  }


}

function* watchGetChainStateRequest({ meta }) {
  yield call(getChainStateRequest, meta)
}


export default function* sagas() {
  yield takeEvery(GET_CHAIN_STATE_REQUEST, watchGetChainStateRequest)

}
