


let timeoutID

export const setNotification=(message,seconds)=>{
  clearTimeout(timeoutID)
  return async dispatch=>{
    dispatch({
      type:'MESSAGE',
      data:{message}
    })
    timeoutID=setTimeout(()=>dispatch({
      type:'CLEAR'
    }),seconds*1000)
  }
}



export const notify=(message)=>{

  return({
    type:'MESSAGE',
    data:{message}
  })
}
export const clearNotification=()=>{
  return({
    type:'CLEAR'
  })
}
const notificationReducer=(state=null,action)=>{
  // console.log('state now: ', state)
  // console.log('action', action)
  switch(action.type){
    case 'MESSAGE':
      return action.data.message
    case 'CLEAR':
      return null
    default:
      return state
  }
}

export default notificationReducer