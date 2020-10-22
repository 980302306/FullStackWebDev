import React , { useRef } from 'react'
import {useDispatch} from 'react-redux'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'


const LoginForm= () => {
  const dispatch=useDispatch()
  const usernameInput=useRef()
  const passwordInput=useRef()
  const handleLogin = async(event) => {
    event.preventDefault()
    const username=event.target.username.value
    const password=event.target.password.value
    try{
      const user=await loginService.login({
        username,password
      })
      window.localStorage.setItem(
        'loggedBlogUser',JSON.stringify(user)
      )
      dispatch(setNotification('success','login successfully',3))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }catch(exception){
      usernameInput.current.value=''
      passwordInput.current.value=''
      dispatch(setNotification('error','username or password is wrong',3))
    }
  }

  return(
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type='text'
          ref={usernameInput}
          name='username'
        />
      </div>
      <div>
        password
        <input
          type='password'
          ref={passwordInput}
          name='password'
        />
      </div>
      <button id='login' type='submit'>login</button>
    </form>
  )
  
}

export default LoginForm