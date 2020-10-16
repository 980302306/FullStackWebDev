import {addAnecdote} from '../reducers/anecdoteReducer'
import React from 'react'
// import {useDispatch} from 'react-redux'
import {connect} from 'react-redux'




const AnecdoteForm = (props) => {
  // const dispatch=useDispatch()
  
  const createAnecdote=async (event)=>{
    event.preventDefault()
    const anecdote=event.target.anecdote.value
    event.target.anecdote.value=''
    // dispatch(addAnecdote(anecdote))
    props.addAnecdote(anecdote)
  }
  return (
    <form onSubmit={createAnecdote}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
  )
}

const mapDispatchToProps=dispatch=>{
  return({
    addAnecdote:(anecdote)=>{
      dispatch(addAnecdote(anecdote))
    }
  })
}
const ConnectedAnecdoteForm=connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm