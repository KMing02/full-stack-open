import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, id: (100000 * Math.random()).toFixed(0),votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const vote = async (anecdote) => {
  const url = `${baseUrl}/${anecdote.id}`
  const response = await axios.put(url, anecdote)
  return response.data
}

export default { getAll, createNew, vote }