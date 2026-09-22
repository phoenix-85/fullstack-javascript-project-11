import axios from 'axios'
import parse from './parser.js'
import validate from './validation.js'
import { render, updateInput, updateStatusView, updateUI, updateDataView } from './view.js'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'

const download = (url) => {
  return axios(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
}

export default async (container, initialState = {}) => {
  const state = proxy({ ...initialState })

  const handleInput = ({ target: { value } }) => {
    state.feed.url = value
    state.status.state = 'editing'
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { feed: { url }, data: { feeds } } = snapshot(state)
    const urlList = feeds.map(feed => feed.url)

    validate(url, urlList)
      .then(() => download(url))
      .then(({ data }) => parse(data.contents))
      .then(({ feed, feedPosts }) => {
        feed.url = url
        state.data.feeds.push(feed)
        state.data.posts.push(...feedPosts)
        state.feed.url = ''
        state.message = 'SUCCESS'
        state.status.state = 'success'
      })
      .catch(error => {
        state.message = error.code || error.message
        state.status.state = 'failed'
      })
  }

  subscribe(state.context, () => updateUI())
  subscribe(state.feed, () => updateInput(snapshot(state.feed)))
  subscribe(state.status, () => updateStatusView(snapshot(state)))
  subscribe(state.data, () => updateDataView(snapshot(state.data)))

  render(container, snapshot(state)).then(() => {
    document.getElementById('input').addEventListener('input', handleInput)
    document.getElementById('form').addEventListener('submit', handleSubmit)
  })
}
