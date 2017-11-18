import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { render } from 'react-dom'
import React from 'react'
import thunk from 'redux-thunk'
import App from './components/App'
import appReducers from './reducers'
import './css/bootstrap.min.css'

let store = createStore(
  appReducers,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
