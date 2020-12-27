  
import React from 'react'
import { allAuthors } from '../queries'
import { useQuery } from '@apollo/client'
import Birthyear from './Birthyear'

const Authors = (props) => {
  const result = useQuery(allAuthors)
  if (!props.show) {
    return null
  }
  let authors=[]
  if (!result.loading){
    authors= result.data.allAuthors
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            {/* <th>
              books
            </th> */}
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              {/* <td>{a.bookCount}</td> */}
            </tr>
          )}
        </tbody>
      </table>
      <Birthyear token={props.token}/>
    </div>
  )
}

export default Authors
