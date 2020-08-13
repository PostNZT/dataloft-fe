import { call, put, takeEvery } from 'redux-saga/effects'

import {
  GET_BUCKET_IDENTITY_REQUEST,
  getBucketIdentitySuccess
} from './actions'

import {
  boxRegister,
} from 'services/3box'

function* getBucketIdentityRequest(meta) {
  const bucketIdentity = yield call(boxRegister)
  console.log('testing')
  yield put(getBucketIdentitySuccess(bucketIdentity, meta))
}

function* watchGetBucketIdentityRequest({ meta }) {
  yield call(getBucketIdentityRequest, meta)
}

export default function* sagas() {
  yield takeEvery(GET_BUCKET_IDENTITY_REQUEST, watchGetBucketIdentityRequest)
}