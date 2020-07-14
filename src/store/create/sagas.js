import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { createPow } from '@textile/powergate-client'
import { ffs } from '@textile/powergate-client'
import config from 'config'

import {
  CREATE_FFS_REQUEST
} from './actions'

import {
  getWalletAccount,
  createWalletAccount,
} from 'services/helpers'

function* createFFSRequest(payload, meta) {
  const POW_HOST = config.POW_HOST
  const powergate = createPow( { POW_HOST })
  // console.log(POW_HOST)
  // console.log(powergate)
  const { address } = payload
  const user = yield call(getWalletAccount, address)
  // console.log(user)
  if(user.status === 404) {
    console.log('test')
    try{
      const { token } = yield call(powergate.ffs.create)
      console.log(token)
    } catch(e) {
      console.log(e)
    }
    // const user = {
    //   _id: address,
    //   address,
    //   token: token,
    // }

    // const data = yield call(createWalletAccount, user)
    
  } 
  

  // TOKEN = token

}

function* watchCreateFFSRequest({ payload, meta}) {
  yield call(createFFSRequest, payload, meta)
}

export default function* sagas() {
  yield takeEvery(CREATE_FFS_REQUEST, watchCreateFFSRequest)
}