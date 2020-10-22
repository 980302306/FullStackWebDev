const blogsRouter=require('express').Router()
const jwt=require('jsonwebtoken')
const Blog=require('../models/blog')
const User=require('../models/user')


blogsRouter.get('/',async(request, response) => {
    const allBlogs= await Blog.find({}).populate('user',{ username:1, name:1, id:1 })
    response.json(allBlogs)
})

blogsRouter.delete('/:id',async(request,response) => {
    // const body=request.body
    const decodedToken=jwt.verify(request.token,process.env.SECRET)
    if(!request.token||!decodedToken.id){
        return response.status(401).json({ error:'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = await  Blog.findById(request.params.id)
    console.log(blog.user._id.toString())
    console.log(user._id.toString())
    if(blog.user._id.toString()===user._id.toString()){
        await Blog.findByIdAndDelete(request.params.id)
        return response.status(204).end()
    }
    response.status(400).send({ error:'this blog is not created by this user' })
})

blogsRouter.put('/:id',async(request,response) => {
    const updataBlog=await Blog.findByIdAndUpdate(request.params.id,request.body, { new:true })
    response.json(updataBlog)
})

blogsRouter.post('/',async (request,response) => {
    const body=request.body
    const decodedToken=jwt.verify(request.token,process.env.SECRET)
    if(!request.token||!decodedToken.id){
        return response.status(401).json({ error:'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user._id
    })
    const saveBlog= await blog.save()
    user.blogs=user.blogs.concat(saveBlog._id)
    await user.save()
    response.json(saveBlog)
})

blogsRouter.post('/:id/comments',async(request,response) => {
    const body=request.body
    const blog=await Blog.findById(request.params.id)
    blog.comments.push(body.comment)
    const updataBlog=await blog.save()
    response.json(updataBlog)
})


module.exports=blogsRouter
