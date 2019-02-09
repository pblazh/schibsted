import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createAppStore from './store/createStore'
import App from './App'
import * as serviceWorker from './serviceWorker'

const initialStore = undefined // get if from SSR
const store = createAppStore(initialStore)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()
