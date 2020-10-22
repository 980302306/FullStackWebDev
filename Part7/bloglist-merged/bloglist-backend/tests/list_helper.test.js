const supertest=require('supertest')
const mongoose =require('mongoose')
const listHelper=require('../utils/list_helper')
const app=require('../app')
const api=supertest(app)
const helper=require('./test_helper')
const Blog=require('../models/blog')
const User=require('../models/user')

beforeEach(async() => {
    await Blog.deleteMany({})
    for (let blog of helper.blogs){
        let blogObject= new Blog(blog)
        await blogObject.save()
    }
    await User.deleteMany({})
    for (let user of helper.userinfo){
        // let UserObject= new User(user)
        await api
            .post('/api/users')
            .send(user)
            .expect(200)
    }
})


describe('dummy',() => {
    test('dummy returns one', () => {
        const blogs = []
        const result = listHelper.dummy(blogs)
        expect(result).toBe(1)
    })
})

describe('total likes', () => {
    test('total likes of all blogs', () => {
        const result = listHelper.totalLikes(helper.blogs)
        expect(result).toBe(36)
    })
})

describe('most blogs', () => {
    test('an author has most blogs', () => {
        const result = listHelper.mostBlog(helper.blogs)
        expect(result).toEqual({
            author: 'Robert C. Martin',
            blogs: 3
        })
    })
})

describe('most likes', () => {
    test('an author has most likes', () => {
        const result = listHelper.mostLikes(helper.blogs)
        expect(result).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 17
        })
    })
})

describe('favariteBlog',() => {
    test('The favoritte blog is', () => {
        const result=listHelper.favoriteBlog(helper.blogs)
        expect(result).toEqual({
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12
        })
    })
})

describe('test user',() => {
    test('create a user',async () => {
        const newUser={
            username: 'test2',
            name:'xhp2',
            password:'xhp2'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
        const usersAtEnd=await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(helper.userinfo.length+1)
    })
    test('a username already exists', async() => {
        await api
            .post('/api/users')
            .send(helper.userinfo[0])
            .expect(400)
        const usersAtEnd=await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(helper.userinfo.length)
    })
    test('a invalid username and password',async () => {
        const newUser={
            username: 'te',
            name:'xhp2',
            password:'xh'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd=await helper.usersInDB()
        expect(usersAtEnd).toHaveLength(helper.userinfo.length)
    })
})

test('the amount of blog is', async () => {
    const allBlogs=await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    expect(allBlogs.body).toHaveLength(helper.blogs.length)
})

test('unique identifier property ', async() => {
    const allBlogs=await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
    expect(allBlogs.body[0].id).toBeDefined()
})
test('create a new blog post',async() => {
    const newBlog= {
        title:'test with token',
        author:'handsome boy',
        url:'www.google.com',
        likes:5
    }
    const user={
        username:helper.userinfo[0].username,
        password:helper.userinfo[0].password
    }
    const res=await api
        .post('/api/login')
        .send(user)
        .expect(200)
    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + res.body.token)
        .send(newBlog)
        .expect(200)
    const blogsAtEnd=await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length+1)
})

test('default likes is 0', async() => {
    const newBlog= {
        title:'test',
        author:'handsome boy',
        url:'www.google.com',
    }
    const user={
        username:helper.userinfo[0].username,
        password:helper.userinfo[0].password
    }
    const res=await api
        .post('/api/login')
        .send(user)
        .expect(200)

    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + res.body.token)
        .send(newBlog)
        .expect(200)
    const blogsAtEnd=await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length+1)
})

test('check title and url', async() => {
    const newBlog= {
        author:'handsome boy'
    }
    const user={
        username:helper.userinfo[0].username,
        password:helper.userinfo[0].password
    }
    const res=await api
        .post('/api/login')
        .send(user)
        .expect(200)
    await api
        .post('/api/blogs')
        .set('Authorization', 'bearer ' + res.body.token)
        .send(newBlog)
        .expect(400)

    const blogsAtEnd=await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})

test('create blog without token',async () => {
    const newBlog= {
        title:'test with token',
        author:'handsome boy',
        url:'www.google.com',
        likes:5
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    const blogsAtEnd=await helper.blogsInDB()
    expect(blogsAtEnd).toHaveLength(helper.blogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})