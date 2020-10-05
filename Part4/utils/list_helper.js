const lodash=require('lodash')
const blog = require('../models/blog')
const dummy = (blogs) => {
    return 1
}

const totalLikes =(blogs) => {
    const reducer = (sum , item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer,0)
}

const favoriteBlog =(blogs) => {
    const initialItem = {
        likes: -1
    }
    const reducer = (maxima, item) => {
        if (item.likes > maxima.likes){
            maxima={
                title : item.title,
                author:item.author,
                likes: item.likes
            }
        }
        return maxima
    }
    return blogs.reduce(reducer,initialItem)
}
const mostBlog=(blogs) => {
    const statistics=[]
    blogs.forEach(blog => {
        let exist=false
        statistics.forEach(statistic => {
            if(statistic.author===blog.author){
                exist=true
                statistic.blogs=statistic.blogs+1
            }
        })
        if(!exist){
            statistics.push({
                author:blog.author,
                blogs:1
            })
        }
        exist=false
    })
    const most= lodash.maxBy(statistics, (statistic) => {return statistic.blogs})
    return most
}

const mostLikes=(blogs) => {
    let exist=false
    const statistics=[]
    blogs.forEach(blog => {
        statistics.forEach(statistic => {
            if(statistic.author===blog.author){
                exist=true
                statistic.likes=statistic.likes+blog.likes
            }
        })
        if(!exist){
            statistics.push({
                author:blog.author,
                likes:blog.likes
            })
        }
        exist=false
    })
    console.log(statistics)
    const most= lodash.maxBy(statistics, (statistic) => {return statistic.likes})
    console.log(most)
    return most
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog,
    mostLikes
}