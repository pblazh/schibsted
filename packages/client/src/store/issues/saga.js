import { call, put, takeLatest, all } from 'redux-saga/effects'
import { issues } from '../../api'

const createFetchData = actions =>
  function * fetchData () {
    const data = yield call(issues)

    if (data) {
      yield put(actions.set(data))
    }
  }

export default actions =>
  function * saga () {
    yield all([takeLatest(actions.fetch.type, createFetchData(actions))])
  }
