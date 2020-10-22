import userService from '../services/users'


export const allUsers=()=>{
  return async dispatch=>{
    const users=await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      users
    })
  }
}



const usersReducer=(state=null,action)=>{
  switch(action.type){
    case 'GET_USERS':
      return action.users
    default:
      return state
  }
}

export default usersReducer