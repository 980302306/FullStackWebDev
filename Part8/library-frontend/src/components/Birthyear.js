import React, { useState } from 'react'
import { allAuthors,SET_BIRTHYEAR } from '../queries'
import { useMutation, useQuery } from '@apollo/client'

const Birthyear=({token})=>{
  
  const result= useQuery(allAuthors)
  const [year, setYear]=useState('')
  const [author,setAuthor]=useState("select")
  
  const [ editAuthor ]= useMutation(SET_BIRTHYEAR)
  if (!token) return null
  if (result.loading) return null
  const submit=(event)=>{
    event.preventDefault()
    editAuthor({variables:{name:author,setBornTo:Number(year)}})
    setAuthor('select')
    setYear('')
  }
  
  return(
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <select value={author} onChange={({target})=>setAuthor(target.value)} >
          <option value="select">Select...</option>
          {result.data.allAuthors.map(author=>
            <option value={author.name} key={author.name}>{author.name}</option>)}
        </select>
        <div>
          born
          <input value={year} onChange={({target})=>setYear(target.value)}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Birthyear