const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const { v1: uuid } =require('uuid')
const mongoose=require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User=require('./models/user')
const Book=require('./models/book')
const Author=require('./models/author')

const MONGODB_URI='mongodb+srv://fullstack:FX9jtc785vyMy55@cluster0.ga6ll.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to',MONGODB_URI)

const JWT_SECRET = 'XHP'

mongoose.connect(MONGODB_URI,{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false,useCreateIndex:true})
  .then(()=>{
    console.log('connected to MongoDB')
  })
  .catch((error)=>{
    console.log('error connection to MongoDB:',error.message)
  })






let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  {
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

  type Book {
    title:String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    born: Int,
    id: ID!
  }
  
  type User{
    username: String!
    favoriteGenre: String!
    password: String!
    id: ID!
  }

  type Token{
    value: String!
  }

  type Subscription{
    bookAdded: Book!
  }

  type Query {
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author:String, genre:String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title:String!
      author: String!
      published: Int!
      genres:[String!]!
    ):Book
    
    editAuthor(
      name:String!
      setBornTo:Int!
    ):Author

    createUser(
      username:String!
      favoriteGenre: String!
      password:String!
    ):User

    login(
      username:String!
      password:String!
    ):Token
  }
`
const { PubSub } = require('apollo-server')
const pubsub=new PubSub()

const resolvers = {
  
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    // bookCount: () => books.length,
    // authorCount: () => authors.length,
    allBooks: (root, args) =>{
      if (!args.author && !args.genre){
        return Book.find({}).populate('author')
      }
      else if(args.author){
        return Book.find({author:args.author}).populate('author')
      }
      else if(args.genre){
        return Book.find({genres:args.genre}).populate('author')
      }
    },

    allAuthors: ()=> Author.find({}),
    me:(root,args,context)=> context.currentUser
  },

  // Author: {
  //   bookCount: (root)=> books.filter(book=>book.author===root.name).length
  // },
  User:{
    password: ()=> "Hidden"
  },

  Mutation: {
    addBook: async(root,args,context)=>{
      if(!context.currentUser){
        throw new AuthenticationError("not authenticated")
      }

      let author=await Author.findOne({name:args.author})
      if (!author){
        author=new Author({name:args.author})
        try{
          await author.save()
        }catch(error){
          throw new UserInputError(error.message,{
            invalidArgs:args
          })
        }
      }
      const book = new Book({...args,author})
      try{
        await book.save()
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs:args
        })
      }
      pubsub.publish('BOOK_ADDED',{bookAdded:book})
      return book
    },

    
    editAuthor: async(root,args,context)=>{
      if(!context.currentUser){
        throw new AuthenticationError("not authenticated")
      }
      const author=await Author.findOne({name:args.name})
      author.born=args.setBornTo

      try{
        await author.save()
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs:args
        })
      }
      return author
    },

    // editAuthor:(root,args)=>{
    //   const author=authors.find(author=>author.name===args.name)
    //   if(!author){
    //     return null
    //   }
    //   const updatedAuthor={...author, born :args.setBornTo}
    //   authors=authors.map(author=>author.name===args.name? updatedAuthor: author)
    //   return updatedAuthor
    // }

    createUser: async(root,args)=>{
      if(!args.password){
        throw new UserInputError('password must be given',{
          invalidArgs:args.password
        })
      }
      if(args.password.length<3){
        throw new UserInputError('password must have at least 3 characters',{
          invalidArgs:args.password
        })
      }
      const saltSounds=10
      const passwordHash=await bcrypt.hash(args.password,saltSounds)
      const user= new User({
        username:args.username,
        favoriteGenre: args.favoriteGenre,
        password:passwordHash
      })
      try{
        await user.save()
      }catch(error){
        throw new UserInputError(error.message,{
          invalidArgs:args
        })
      }
      return user
    },

    login: async(root, args)=>{
      const user= await User.findOne({username:args.username})
      const passwordCorrect=user===null
        ? false
        : await bcrypt.compare(args.password,user.password)
      if(!user || !passwordCorrect){
        throw new UserInputError("wrong credentials")
      }
      const userToken={
        username:user.username,
        id:user._id
      }
      return {value:jwt.sign(userToken,JWT_SECRET)}
    }
  },
  Subscription:{
    bookAdded:{
      subscribe: ()=>pubsub.asyncIterator(['BOOK_ADDED'])
      
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req})=>{
    const auth=req?req.headers.authorization:null
    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const decodeToken = jwt.verify(
        auth.substring(7),JWT_SECRET
      )
      const currentUser=await User.findById(decodeToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {

  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
