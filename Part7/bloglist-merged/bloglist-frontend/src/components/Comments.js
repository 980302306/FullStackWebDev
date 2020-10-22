import React,{useRef} from 'react'
import { addComment } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
const Comments=({blog,id}) => {
  const commentRef=useRef()
  const dispatch=useDispatch()
  const submitComment=async(event)=>{
    event.preventDefault()
    const comment=commentRef.current.value
    dispatch(addComment(id,comment))
    commentRef.current.value=''
  }
  return(
    <div className='container'>
      <h2 className="title is-2">comments</h2>
      <form onSubmit={submitComment} className='field'>
        <div className='field has-addons'>
          <input id='comment' ref={commentRef} placeholder='add some comments...' className='input is-small is-rounded'/>
          <button type='submit' className='button is-primary is-small'>add comment</button>
        </div>
        
      </form>
      <div className='content'>
        <ul>
          {blog.comments.map((comment,index)=><li key={index}>{comment}</li>)}
        </ul>
      </div>
    </div>
  )
}
export default Comments