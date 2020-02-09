import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { users, tabs } from './reducer'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}
const rootReducer = combineReducers({
  users,
  tabs,
});
export const initStore = () => {
  return createStore(
    rootReducer,
    bindMiddleware([thunkMiddleware])
  )
}

export type IStore = ReturnType<typeof createStore>;