import {createStore,combineReducers,applyMiddleware} from 'redux'
import anecdotesReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReduer'
import filterReducer from './reducers/filterReducer'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
const reducer=combineReducers({
  anecdotes:anecdotesReducer,
  notification:notificationReducer,
  filterKeyword:filterReducer
})

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
  )

export default store