
export const setFilter=(keyword)=>{
  return({
    type:'SET_FILTER',
    keyword
  })
}

const filterReducer=(state='',action)=>{
  switch(action.type){
    case 'SET_FILTER':
      return action.keyword
    default:
      return state
  }
}

export default filterReducer