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

const likeBlog = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`)
  return res.data
}

const deleteBlog = async (blog, config) => {
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return res.data
}

const commentBlog = async (blog, comment) => {
  const res = await axios.post(`${baseUrl}/${blog.id}/comments`, { comment })
  return res.data
}

export default { getAll, postBlog, likeBlog, deleteBlog, commentBlog }
