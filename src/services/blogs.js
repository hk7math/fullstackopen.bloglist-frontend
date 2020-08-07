import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const postBlog = async (blog, config) => {
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

export default { getAll, postBlog }