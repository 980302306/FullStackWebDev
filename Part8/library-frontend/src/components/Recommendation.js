import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import {ALL_BOOKS,CHECK_USER} from '../queries'

const Recommendation=({show})=>{
  const [getBooks, result]=useLazyQuery(ALL_BOOKS)
  const [books, setBooks]=useState(null)
  const user = useQuery(CHECK_USER)
  
  useEffect(()=>{
    if(result.data){
      setBooks(result.data.allBooks)
    }
  },[result])
  
  useEffect(()=>{
    if(!user.loading){
      const favoriteGenre=user.data.me.favoriteGenre
      getBooks({variables:{genre:favoriteGenre}})
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user.loading])
  if(!show) return null
  


  return(
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>patterns</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )


}

export default Recommendation