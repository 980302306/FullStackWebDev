import React from 'react'
// import {useSelector,useDispatch} from 'react-redux'
import {connect} from 'react-redux'
import {addVotes} from '../reducers/anecdoteReducer'
import {setNotification} from '../reducers/notificationReduer'




const AnecdoteList=(props)=>{
  // const anecdotes = useSelector(state => state.anecdotes)
  const anecdotes = props.anecdotes
  // const filterKeyword=useSelector(state => state.filterKeyword)
  const filterKeyword=props.filterKeyword
  anecdotes.sort((anecdote1,anecdote2)=>anecdote2.votes-anecdote1.votes)
  const filteredAnecdotes=anecdotes.filter(anecdote=>anecdote.content.includes(filterKeyword))
  // const dispatch = useDispatch()
  const vote = (id) => {
    const votedAnecodte=anecdotes.find(anecdote=>anecdote.id===id)
    const newAnecodte={...votedAnecodte,votes:votedAnecodte.votes+1}
    props.addVotes(id,newAnecodte)
    props.setNotification(`you voted '${votedAnecodte.content}'`,1)
    // dispatch(addVotes(id,newAnecodte))
    // dispatch(setNotification(`you voted '${votedAnecodte.content}'`,1))
  }
  return(
    filteredAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )
  )
}

const mapStateToProps=(state)=>{
  return({
    anecdotes:state.anecdotes,
    filterKeyword:state.filterKeyword    
  })
}
const mapDispatchToProps=dispatch=>{
  return({
    addVotes:(id,newAnecodte)=>{
      dispatch(addVotes(id,newAnecodte))
    },
    setNotification:(message,time)=>{
      dispatch(setNotification(message,time))
    }
  })
}

const ConnectedAnecdoteList=connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList