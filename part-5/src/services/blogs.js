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

export const updateBlog = async (id, newBlog) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.put(`${BASE_URL}/${id}`, newBlog, config)
  return res.data
}

export const deleteBlogById = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.delete(`${BASE_URL}/${id}`, config)
  return res.status
}
