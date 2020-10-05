const config=require('./utils/config')
const express=require('express')
require('express-async-errors')
const app=express()
const cors=require('cors')
const blogsRouter=require('./controllers/blogs')
const userRouter=require('./controllers/user')
const loginRouter=require('./controllers/login')
const logger=require('./utils/logger')
const mongoose=require('mongoose')
const middleware=require('./utils/middleware')

logger.info('connecting to ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI,{ useCreateIndex:true,useFindAndModify:false,useNewUrlParser:true,useUnifiedTopology:true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB: ',error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.tokenExtractor)
app.use('/api/login',loginRouter)
app.use('/api/users',userRouter)
app.use('/api/blogs',blogsRouter)
app.use(middleware.errorHandler)
module.exports= app


