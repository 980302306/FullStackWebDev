import React, { useEffect, useRef } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Navigation from './components/Navigation'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

import blogService from './services/blogs'

import { useDispatch,useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'


const App = () => {
  const dispatch = useDispatch()
  const blogFormRef=useRef()

  

  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const blogs=useSelector(state=>state.blogs)
  const user=useSelector(state=>state.user)

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  },[dispatch])

  


  if(user===null){
    return(
      <div>
        <h1>log in to application</h1>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  return (
    <div>
      <Navigation username={user.username} />
      <Switch>
        <Route path='/blogs/:id'>
          <Notification />
          <Blog />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users/>
        </Route>
        <Route path='/'>
          <div className='container'>
            <h2 className='title is-2'>blogs</h2>
            <Notification />
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm formRef={blogFormRef}/>
            </Togglable>
            <BlogList blogs={blogs}/>
          </div>
        </Route>
      </Switch>
      
      
    </div>
  )
}

export default App