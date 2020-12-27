import { gql } from '@apollo/client'

export const BOOK_DETAILS=gql`
  fragment BookDetails on Book{
    title
    author{
      name
    }
    published
    genres
  }

`
export  const allAuthors=gql`
  query{
    allAuthors{
      name
      born
      id
    }
  }
`

// export const ALL_BOOKS=gql`
//   query{
//     allBooks{
//       title
//       author{
//         name
//       }
//       published
//       id
//       genres
//     }
//   }
// `

export const ALL_BOOKS=gql`
  query searchBooks($author:String, $genre:String){
    allBooks(
      author:$author,
      genre:$genre
    ){
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`
export const CHECK_USER=gql`
  query{
    me{
      username
      favoriteGenre
    }
  }
`



export const BOOK_ADDED=gql`
  subscription {
    bookAdded{
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

// export const BOOK_ADDED=gql`
//   subscription {
//     bookAdded{
//       title
//       author{
//         name
//       }
//       published
//       genres
//     }
//   }
// `




export const ADD_BOOK=gql`
  mutation createBook($title: String!, $author: String!,$published:Int!, $genres:[String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`



export const SET_BIRTHYEAR=gql`
  mutation setBirthyear($name:String! $setBornTo:Int!){
    editAuthor(
      name:$name,
      setBornTo:$setBornTo
    ){
      name
      born
      id
    }
  }
`


export const LOGIN=gql`
  mutation login($username:String!,$password:String!){
    login(username:$username,password:$password){
      value
    }
  }

`