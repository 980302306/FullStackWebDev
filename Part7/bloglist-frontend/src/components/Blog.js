import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import Comments from './Comments'
import { setNotification } from '../reducers/notificationReducer'
import { addLike, deleteBlog } from '../reducers/blogReducer'
import blogService from '../services/blogs'



// import ToggleBlog from './ToggleBlog'
const Blog = () => {
  const match = useRouteMatch('/blogs/:id')
  const blogs = useSelector(state => state.blogs)
  const dispatch=useDispatch()
  if(blogs.length===0) return null
  console.log(blogs)
  const blog = blogs.find(blog => blog.id === match.params.id )

  const blogOject = {
    user:blog.user.id,
    author:blog.author,
    url:blog.url,
    likes:blog.likes+1,
    title:blog.title
  }
  
  const clickLike =async (blogId,blogObject) => {
    try{
      const newBlog=await blogService.addLikes(blogId,blogObject)
      dispatch(setNotification('success',`like  ${blogObject.title} by ${blogObject.author}`,3))
      dispatch(addLike(newBlog,blogId))
    }catch(exception){
      dispatch(setNotification('error',`fail to add like`,3))
    }
    
    
  }
  const clickRemove =async (blogId) => {
    try{
      await blogService.deleteBlog(blogId)
      dispatch(setNotification('success','delete successfully',3))
      dispatch(deleteBlog(blogId))

    }catch(exception){
      
      dispatch(setNotification('error','fail to delete',3))
    }
  }

  const remove=() => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    clickRemove(blog.id)
  }
  
  return(
    <div className='container'>
      <h2 className="title is-2">
        {blog.title} {blog.author}
        <button className='button is-danger is-medium is-outlined' onClick={remove}>remove</button>
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div className="columns ">
        <div className="column is-1">
         <div id='likes'><b>likes:</b>{blog.likes}</div>
        </div>
        <div className="column is-1">
            <button id='like' className='button is-info is-small' onClick={() => clickLike(blog.id,blogOject)}>like</button>
        </div>
      </div>
        
      
      <div><i>added by {blog.user.username} </i> </div>
      
      <Comments id={blog.id} blog={blog}/>
    </div>
  )
}
export default Blog