import React from 'react'
import ToggleBlog from './ToggleBlog'
const Blog = ({ blog,clickLike,clickRemove }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const blogOject = {
    user:blog.user.id,
    author:blog.author,
    url:blog.url,
    likes:blog.likes+1,
    title:blog.title
  }
  const remove=() => {
    window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    clickRemove(blog.id)
  }
  return(
    <div style={blogStyle}>
      <ToggleBlog title={blog.title} author={blog.author}>
        <div>{blog.url}</div>
        <div id='likes'>
          <span> likes:{blog.likes} </span>
          <button id='like' onClick={() => clickLike(blog.id,blogOject)}>like</button>
        </div>
        <div>{blog.author}</div>
        <button onClick={remove}>remove</button>
      </ToggleBlog>
    </div>
  )
}
export default Blog