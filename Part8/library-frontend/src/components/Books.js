import React, { useState,  } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'


const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  // const [getBooks, result]=useLazyQuery(ALL_BOOKS)
  // const [books, setBooks]=useState(null)
  // useEffect(()=>{
  //   if(result.data){
  //     setBooks(result.data.allBooks)
  //   }
  // },[result])

  const [genre,setGenre]=useState('all')
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  if (!books){
    return null
  }


  let genreSet= new Set()
  books.forEach(book => genreSet.add(...book.genres))
  const genres=[...genreSet]
  // const selectGenre=(mode)=>mode==='all'?getBooks():getBooks({variables:{genre:mode}})
  const selectGenre=(mode)=>setGenre(mode)
  const filteredBooks=genre==='all'?books:books.filter(book=>book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>
      <p> in genre <b>patterns</b></p>
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
          {filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
      {genres.map(genre=><button key={genre} onClick={()=>selectGenre(genre)}>{genre}</button>)}
      <button onClick={()=>selectGenre('all')}>all generes</button>
      </div>
    </div>
  )
}

export default Books