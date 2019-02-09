import { call, put, takeLatest, all } from 'redux-saga/effects'
import { issues, remove, append, setPending, setClosed } from '../../api'

const createRequest = actions =>
  function * request () {
    const data = yield call(issues)
    if (data) {
      yield put(actions.set(data))
    }
  }

const createMutation = (actions, method) =>
  function * mutation (action) {
    const data = yield call(method, action.payload)
    if (!data.error) {
      yield put(actions.fetch())
    }
  }

export default actions =>
  function * saga () {
    yield all([
      takeLatest(actions.fetch.type, createRequest(actions)),
      takeLatest(actions.append.type, createMutation(actions, append)),
      takeLatest(actions.remove.type, createMutation(actions, remove)),
      takeLatest(actions.pending.type, createMutation(actions, setPending)),
      takeLatest(actions.closed.type, createMutation(actions, setClosed)),
    ])
  }
