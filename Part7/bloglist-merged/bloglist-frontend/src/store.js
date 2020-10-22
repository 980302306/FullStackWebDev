import thunk from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'
const reducer = combineReducers({
  blogs:blogReducer,
  message:notificationReducer,
  user:userReducer,
  users:usersReducer
})

const store=createStore(
  reducer,
  applyMiddleware(thunk)
)

export default store