import { call, put, takeEvery } from 'redux-saga/effects'
import CID from 'cids'
import {
  encrypt,
  fileToData
} from 'services/handleFiles'

import {
  ENCRYPT_DATA_FILE_REQUEST,
  encryptDataFileSuccess,
  encryptDataFileFailure
} from './actions'

import {
  createFFS,
  addressList,
  jobStatus,
  cidStatus,
  CID_CONFIG,
  setStorageConfig,
  powergatePush,
} from 'services/powergate'

import {
  setup,
  insertFileBucket,
} from 'services/buckets'

import {
  boxRegister,
} from 'services/3box'


function* encryptDataFileRequest(payload, meta) {
  try {
    const { fileList, key, hint } = payload
    const { name: filename } = fileList[0]
   
    const data = yield call (fileToData, fileList[0])
    if (data) {
      // Encrypt Data
      const encrypted_data = yield call(encrypt, data, filename, key, hint)

      // gets identity from 3box
      const identity = yield call(boxRegister)
      console.log({identity})

      // Init Bucket
      const {list, bucketKey, buckets} = yield call(setup, identity.identity)

      // returns list of files in a bucket
      console.log(list.itemsList)

      // Inserts File to bucket
      const insertFile = yield call(insertFileBucket, buckets, bucketKey, encrypted_data, filename)
      console.log(insertFile.path.cid.string)

      // Set Pow token ToDo Needs to set token from account creation
      const token = yield call(createFFS)

      // Get pow addrs
      const addrsList = yield call(addressList)
      const addrs = addrsList[0].addr

      // Get storage config obj with addrs
      const storageConfig = yield call(CID_CONFIG, addrs)

      // Set Default config
      const set = yield call(setStorageConfig, storageConfig)
      const cid = insertFile.path.cid.string
      // const cids = new CID(0, 'dag-pb', cidh)
      // const cid = cids.toString()

      // Stage and Push data to ffs
      const stagedPayload = {
        encrypted_data, storageConfig, cid
      }
      const store = yield call(powergatePush, stagedPayload)
      const { jobId } = store

      // Get Job status
      const cidS = yield call(cidStatus, cid)
      const jobS = yield call(jobStatus, jobId)
      console.log({cidS})
      console.log({jobS})

      const dataInfo = { filename, key, hint, fileBuffer: encrypted_data.file }
      yield put(encryptDataFileSuccess(dataInfo, meta))
    } else {
      yield put(encryptDataFileFailure(data.error))
    }
  } catch (error) {
    yield put(encryptDataFileFailure(error))
  }
}

function* watchEncryptDataFileRequest({ payload, meta}) {
  yield call(encryptDataFileRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(ENCRYPT_DATA_FILE_REQUEST, watchEncryptDataFileRequest)
}
