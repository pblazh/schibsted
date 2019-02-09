export function makeReplaceReducer (actionCreator, initialState) {
  return (state = initialState, action) =>
    actionCreator.type === action.type ? action.payload : state
}

export function makeAction (type) {
  const action = payload => ({ type, payload })
  action.type = type
  return action
}

export function composeReducers (...reducers) {
  return (store, action) =>
    reducers.reduce(
      (processedStore, reducer) => reducer(processedStore, action),
      store
    )
}
