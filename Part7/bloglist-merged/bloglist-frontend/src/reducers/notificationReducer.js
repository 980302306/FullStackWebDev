
let timeoutID
export const setNotification= (type,detail,seconds) =>{
  clearTimeout(timeoutID)
  return async (dispatch)=>{
    dispatch({
      type:'SET_NOTIFICATION',
      data:{
        type,
        detail
      }
    })
    timeoutID=setTimeout(() => {
      dispatch({ type:'CLEAR_NOTIFICATION' })
    }, seconds*1000);
  }
}

export const clearNotification=()=>{
  return async (dispatch) =>{
    dispatch({ type : 'CLEAR_NOTIFICATION' })
  }
}


const notificationReducer=(state=null,action)=>{
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.data
    case 'CLEAR_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer