import React from 'react'

import {Link} from 'react-router-dom'

const BlogList=({blogs})=>{
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  

  

  return(
    blogs.map(blog=>{
      return(
        <div key={blog.id} style={blogStyle} >
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
      )  
    })
  )

  // return(blogs.map(blog => <Blog key={blog.id} blog={blog} clickLike={clickLike} clickRemove={clickRemove}/>))
}

export default BlogList