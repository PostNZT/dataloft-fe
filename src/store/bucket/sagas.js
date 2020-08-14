import { call, put, takeEvery, select } from 'redux-saga/effects'

import {
  GET_BUCKET_IDENTITY_REQUEST,
  getBucketIdentitySuccess,
  GET_BUCKET_DATA_FILES_REQUEST,
  getBucketDataFilesSuccess,
  getBucketDataFilesFailure,
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
  let identity 
  if(payload.bucketIdentity) {
    identity = payload.bucketIdentity.identity
  } else {
    const { identity: bucket } = yield select(state=> state.bucket.get('bucketProfile'))
    identity = bucket
  }

  console.log({identity})
  try {
    let old = yield select(state => state.bucket.get('bucketFiles'))
    if(!Array.isArray(old)) {
      old = []
    }
    console.log({old})
    let { list } = yield call(setup, identity)
    
    if(list) {
      let dataFiles = list.itemsList
      yield call([localStorage, localStorage.clear])
      yield call([localStorage, localStorage.setItem], 'dataFiles', JSON.stringify(dataFiles))

      yield put(getBucketDataFilesSuccess(dataFiles, meta))
    } else {
      yield put(getBucketDataFilesFailure(list.error, meta))
    }

  } catch (error) {
    console.log(error)
    yield put(getBucketDataFilesFailure(error, meta))
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