import React,{ useState } from 'react'

const BlogForm= ({ createBlog }) =>
{
  const [title,setTitle]=useState('')
  const [author, setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const handleCreate = (event) => {
    event.preventDefault()
    createBlog({
      title:title,
      author:author,
      url:url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return(
    <form onSubmit={handleCreate}>
      <div>
        title
        <input
          id='title'
          type='text'
          name='Title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id='author'
          type='text'
          name='Author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id='url'
          type='text'
          name='Url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id='submitBlog' type='submit'>create</button>
    </form>
  )
}

export default BlogForm