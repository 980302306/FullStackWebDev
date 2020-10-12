import axios from 'axios'
const baseUrl = '/api/blogs'

let token=null


const setToken = newToken => {
  token=`bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async(blog) => {
  const config={
    headers:{ Authorization:token }
  }
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const addLikes = async(id,blog) => {
  const config={
    headers:{ Authorization:token }
  }
  const response= await axios.put(`${baseUrl}/${id}`, blog, config)
  return response.data
}
const deleteBlog = async(id) => {
  const config={
    headers:{ Authorization:token }
  }
  const response= await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}

export default { getAll,setToken, createBlog, addLikes, deleteBlog }