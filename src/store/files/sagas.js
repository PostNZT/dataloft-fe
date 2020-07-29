import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_DATA_FILES_REQUEST
} from './actions'

function* getDataFilesRequest(payload, meta) {
  const { fileList, mode, hint  } = payload
  
  console.log('testing')

}

function* watchGetDataFilesRequest({payload, meta}) {
  yield call(getDataFilesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_DATA_FILES_REQUEST, watchGetDataFilesRequest) 
}