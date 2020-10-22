import React,{ useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm= ({  formRef }) =>
{
  const dispatch=useDispatch()
  const titleRef=useRef()
  const authorRef=useRef()
  const urlRef=useRef()



  const handleCreate = (event) => {
    event.preventDefault()
    formRef.current.toggleVisibility()

    const title=titleRef.current.value
    const author=authorRef.current.value
    const url=urlRef.current.value
    try{
      dispatch(createBlog({title,author,url}))
      dispatch(setNotification('success',`a new blog ${title} by ${author}`,3))
      titleRef.current.value=''
      authorRef.current.value=''
      urlRef.current.value=''
    }catch{
      dispatch(setNotification('error',`fail to create blog ${title}`,3))
    }
    
    
  }
  return(
    <form className='field' onSubmit={handleCreate}>
      <div>
        <label className='label'>title</label>
        
        <input
          id='title'
          type='text'
          ref={titleRef}
          className='input is-small is-rounded'
        />
      </div>
      <div>
      <label className='label'>author</label>
        
        <input
          id='author'
          type='text'
          ref={authorRef}
          className='input is-small is-rounded'
        />
      </div>
      <div>
      <label className='label'>url</label>
        
        <input
          id='url'
          type='text'
          ref={urlRef}
          className='input is-small is-rounded'
        />
      </div>

      <button id='submitBlog' type='submit' className='button is-primary is-small'>create</button>
    </form>
  )
}

export default BlogForm