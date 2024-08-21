import axios from 'axios'

const BASE_URL = '/api/blogs'
let token = null

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

export const getAllBlogs = async () => {
  const res = await axios.get(BASE_URL)
  return res.data
}

export const addBlog = async (newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.post(BASE_URL, newBlog, config)
  return res.data
}