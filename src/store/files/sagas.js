import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_DATA_FILES_REQUEST
} from './actions'

import {
  getHint,
  handleFiles
} from 'services/handleFiles'

function* getDataFilesRequest(payload, meta) {
  const { fileList } = payload
  
  const mode = yield call(handleFiles, fileList)
  // if (mode === 'decrypt') {
  //   const hint = getHint(fileList[0])
  //   if (hint) {
  //     onFilesAdded(fileList, mode, hint)
  //   }
  // } else {
  //   onFilesAdded(fileList, mode)
  // }


}

function* watchGetDataFilesRequest({payload, meta}) {
  yield call(getDataFilesRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(GET_DATA_FILES_REQUEST, watchGetDataFilesRequest) 
}