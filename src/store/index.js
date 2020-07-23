import { combineReducers } from 'redux'
import { fork, all } from 'redux-saga/effects'

import { tests } from './tests/reducers'
import { auth } from './auth/reducers'
import { create } from './create/reducers'
import { reducer as thunkReducer } from 'redux-saga-thunk'
import * as testSagas from './tests/sagas'
import * as authSagas from './auth/sagas'
import * as createSagas from './create/sagas'

export const rootReducer = combineReducers({
  thunk: thunkReducer,
  tests,
  auth,
  create,
})

export function* rootSaga() {
  yield all([
    ...Object.values(testSagas),
    ...Object.values(authSagas),
    ...Object.values(createSagas),
  ].map(fork))
}

