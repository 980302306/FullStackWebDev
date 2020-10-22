import blogService from '../services/blogs'


export const initializeBlogs=()=>{
  return async dispatch => {
    const blogs= await blogService.getAll()
    //sort blogs
    blogs.sort((blog1,blog2) => blog2.likes-blog1.likes)
    dispatch({
      type:'INIT',
      blogs
    })
  }
}

export const addLike=(newBlog,blogId)=>{
  return{
    type:'ADD_LIKE',
    blogId,
    newBlog
  }
}

export const deleteBlog=(blogId)=>{
  return{
    type:'DELETE_BLOG',
    blogId
  }
}

export const createBlog=(Blog)=>{
  return async dispatch => {
    const newBlog=await blogService.createBlog(Blog)
    dispatch({
      type:'CREATE_BLOG',
      newBlog
    })
  }
}
export const addComment=(blogId,comment)=>{
  return async dispatch => {
    await blogService.addComment(blogId,{comment})
    dispatch({
      type:'COMMENT',
      blogId,
      comment
    })
  }
}


const blogReducer = (state=[],action)=>{
  switch(action.type){
    case 'INIT':
      return action.blogs
    case 'CREATE_BLOG':
      return state.concat(action.newBlog)
    case 'ADD_LIKE':
      return state.map(blog=>blog.id===action.blogId?action.newBlog:blog)
    case 'DELETE_BLOG':
      return state.filter(blog=>blog.id!==action.blogId)
    case 'COMMENT':
      return state.map(blog=>blog.id===action.blogId
        ? { ...blog,
            comments: blog.comments.concat(action.comment)
          }
        :blog)
    default:
      return state
  }
}

export default blogReducer