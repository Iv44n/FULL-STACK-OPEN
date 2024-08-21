import axios from 'axios'

const BASE_URL = '/api/blogs'

export const getAllBlogs = async () => {
  const res = await axios.get(BASE_URL)
  return res.data
}
