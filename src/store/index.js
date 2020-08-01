import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import { tests } from './tests/reducers'
import { auth } from './auth/reducers'
import { create } from './create/reducers'
import { encrypt } from './encrypt/reducers'
import { encryptMultiple } from './encryptMultiple/reducers'
import { decrypt } from './decrypt/reducers'
import { config } from './config/reducers'
import { lotus } from './lotus/reducers'
import { reducer as thunkReducer } from 'redux-saga-thunk'
import * as testSagas from './tests/sagas'
import * as authSagas from './auth/sagas'
import * as createSagas from './create/sagas'
import * as encryptSagas from './encrypt/sagas'
import * as encryptMultipleSagas from './encryptMultiple/sagas'
import * as decryptSagas from './decrypt/sagas'
import * as configSagas from './config/sagas'
import * as lotusSagas from './lotus/sagas'

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  tests,
  auth,
  create,
  encrypt,
  encryptMultiple,
  config,
  lotus,
  decrypt,
})

export function* rootSaga() {
  yield all([
    ...Object.values(testSagas),
    ...Object.values(authSagas),
    ...Object.values(createSagas),
    ...Object.values(encryptSagas),
    ...Object.values(encryptMultipleSagas),
    ...Object.values(decryptSagas),
    ...Object.values(configSagas),
    ...Object.values(lotusSagas),
  ].map(fork))
}

