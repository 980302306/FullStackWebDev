import React from 'react'
import { useSelector } from 'react-redux'
const Notification =() => {
  const message=useSelector(state=>state.message)
  if(message===null) return null
  const style={
    color:message.type==='success'? 'green' : 'red',
    background:'lightgrey',
    fontSize:20,
    borderStyle:'solid',
    borderRadius:5,
    padding:10,
    marginBottom:10
  }
  return <div id='notification' style={style}>{message.detail}</div>

}
export default Notification