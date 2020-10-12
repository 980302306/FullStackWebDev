import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [message,setMessage]=useState(null)
  const blogFormRef=useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  },[])
  //sort blogs
  blogs.sort((blog1,blog2) => blog2.likes-blog1.likes)

  useEffect(() => {
    const loggedUserJSON=window.localStorage.getItem('loggedBlogUser')
    if(loggedUserJSON){
      const user=JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async(event) => {
    event.preventDefault()
    try{
      const user=await loginService.login({
        username,password
      })
      window.localStorage.setItem(
        'loggedBlogUser',JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
      setUser(user)
      blogService.setToken(user.token)
    }catch(exception){
      console.log('username or password is wrong')
      setMessage({ type:'error', detail:'username or password is wrong' })
      setTimeout(() => setMessage(null),3000)
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogUser')
  }


  const loginForm= () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => {setUsername(target.value)}}
        />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => {setPassword(target.value)}}
        />
      </div>
      <button id='login' type='submit'>login</button>
    </form>
  )

  const addBlog =async(blogObject) => {
    blogFormRef.current.toggleVisibility()
    const newBlog=await blogService.createBlog(blogObject)
    blogs.concat(newBlog)
    setMessage({ type:'success',detail:`a new blog ${blogObject.title} by ${blogObject.author}` })
    setTimeout(() => setMessage(null),3000)
  }
  const clickLike =async (blogId,blogObject) => {
    await blogService.addLikes(blogId,blogObject)
    setMessage({ type:'success',detail:`like  ${blogObject.title} by ${blogObject.author}` })
    setTimeout(() => setMessage(null),3000)
  }

  const clickRemove =async (blogId) => {
    try{
      await blogService.deleteBlog(blogId)
      setMessage({ type:'success',detail:'delete successfully' })
      setTimeout(() => setMessage(null),3000)
    }catch(exception){
      setMessage({ type:'error',detail:'fail to delete' })
      setTimeout(() => setMessage(null),3000)
    }
  }

  if(user===null){
    return(
      <div>
        <h1>log in to application</h1>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <div>
          <h2>create new</h2>
          <BlogForm createBlog={addBlog}/>
        </div>
      </Togglable>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} clickLike={clickLike} clickRemove={clickRemove}/>)}
    </div>
  )
}

export default App