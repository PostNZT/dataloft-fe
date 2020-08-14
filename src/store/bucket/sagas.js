import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_BUCKET_IDENTITY_REQUEST,
  getBucketIdentitySuccess,
  GET_BUCKET_DATA_FILES_REQUEST,
  getBucketDataFilesSuccess,
  getBucketDataFilesFailure
} from './actions'

import {
  boxRegister,
} from 'services/3box'

import {
  setup
} from 'services/buckets'


function* getBucketIdentityRequest(meta) {
  const bucketIdentity = yield call(boxRegister)
  yield put(getBucketIdentitySuccess(bucketIdentity, meta))
}

function* getBucketDataFilesRequest(payload, meta) {
  const { identity } = payload
  const { list } = yield call(setup, identity)
  if(list) {
    let dataFiles = list.itemsList
    console.log('test')
    console.log(dataFiles)
    yield put(getBucketDataFilesSuccess(dataFiles, meta))
  } else {
    yield put(getBucketDataFilesFailure(list.error, meta))
  }
}

function* watchGetBucketIdentityRequest({ meta }) {
  yield call(getBucketIdentityRequest, meta)
}

function* watchGetBucketDataFilesRequest({ payload, meta }) {
  yield call(getBucketDataFilesRequest, payload, meta)  
}

export default function* sagas() {
  yield takeEvery(GET_BUCKET_IDENTITY_REQUEST, watchGetBucketIdentityRequest)
  yield takeEvery(GET_BUCKET_DATA_FILES_REQUEST, watchGetBucketDataFilesRequest)
}