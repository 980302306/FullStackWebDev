import React from 'react'

const Notification =({ message }) => {
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