const bcrypt =require('bcrypt')
const User=require('../models/user')
const userRouter=require('express').Router()

userRouter.post('/',async(request,response) => {
    const body=request.body
    const saltRounds=10
    if(!body.password){
        return response.status(400).send({ error: 'password must be given' })
    }
    if(body.password.length<3){
        return response.status(400).send({ error: 'password must have at least 3 characters' })
    }
    const passwordHash=await bcrypt.hash(body.password,saltRounds)
    const user=new User({
        username:body.username,
        name:body.name,
        passwordHash,
    })
    const saveUser=await user.save()
    response.json(saveUser)
})

userRouter.get('/',async(request,response) => {
    const user=await User
        .find({}).populate('blogs',{ url:1,title:1,author:1,id:1 })
    response.json(user)
})
module.exports=userRouter