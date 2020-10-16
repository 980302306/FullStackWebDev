import anecdoteService from '../services/anecdoteService'
export const addVotes = (id,anecdote) => {
  return async dispatch=>{
    await anecdoteService.addVote(id,anecdote)
    dispatch({
      type:'VOTE',
      data:{id}
    })
  }
}

export const addAnecdote = (content) => {
  return async dispatch=>{
    const newAnecdote=await anecdoteService.addAnecdote(content)
    dispatch({
      type:'CREATE',
      data:newAnecdote
    })
  }
}

export const initializeAnecdotes=() =>{
  return async dispatch => {
    const anecdotes=await anecdoteService.getAll()
    dispatch({
      type:'INIT_ANECDOTES',
      data:anecdotes
    })
  }
}



const anecdotesReducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch(action.type){
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const id=action.data.id
      const voteAnecdote=state.find(anecdote=>anecdote.id===id)
      const changedAnedote={
        ...voteAnecdote,
        votes:voteAnecdote.votes+1
      }
      return state.map(anecdote=>anecdote.id!==id?anecdote:changedAnedote)
    case 'CREATE':
      return [...state,action.data]
    default:
      return state
  }
}

export default anecdotesReducer