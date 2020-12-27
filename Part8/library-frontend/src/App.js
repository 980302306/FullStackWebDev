
import { useApolloClient, useSubscription } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendation from './components/Recommendation'
import {BOOK_ADDED,ALL_BOOKS} from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken]=useState(null)
  const client=useApolloClient()
  const updateCacheWith=(addedBook)=>{
    const includedIn=(set, object)=> set.map(p=>p.id).includes(object.id)
    const dataInStore = client.readQuery({query: ALL_BOOKS })
    if(!includedIn(dataInStore.allBooks, addedBook)){
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }

  useSubscription(BOOK_ADDED,{
    onSubscriptionData: ({subscriptionData})=>{
      const addedBook=subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })


  const logout=()=>{
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')} hidden={token===null}>add book</button>
        <button onClick={()=>setPage('recommendation')} hidden={token===null} >recommended</button>
        <button onClick={() => setPage('login')} hidden={token!==null}>login</button>
        <button onClick={logout} hidden={token===null}>logout</button>
      </div>

      <Authors
        show={page === 'authors'} token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendation show={page==='recommendation'}/>

      <LoginForm
        show={page === 'login'} setToken={setToken} setPage={setPage}
      />
      
    </div>
  )
}

export default App