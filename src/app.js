import fetchData from "./fetchdata.js"
import parse from './parser.js'
import validate from './validation.js'
import { uniqueId } from 'es-toolkit/compat'
import { render, updateInput, updateStatusView, updateUI, updateFeedsView, updatePostsView } from './view.js'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'

export default async (container, initialState = {}) => {
  const state = proxy({ ...initialState })

  const addNewFeed = (url, feed) => {
    feed.url = url
    feed.id = uniqueId()
    state.feeds.data.push(feed)
    return feed.id
  }

  const addNewPosts = (feedId, posts) => {
    const lastPubDate = new Date(state.postPubDates[feedId] ?? 0)

    const newPosts = posts
      .filter(post => new Date(post.pubDate) > lastPubDate)
      .map(post => ({ feedId, ...post }))

    if (newPosts.length > 0) {
      state.posts.data.unshift(...newPosts)
      state.postPubDates[feedId] = new Date(newPosts[0].pubDate)
    }
  }

  const fetchNewFeedPosts = async () => {
    const { data } = snapshot(state.feeds)

    if (data.length === 0) return

    const promises = data.map(({ id, url }) => {
      return fetchData(url)
        .then(parse)
        .then(({ feedPosts }) => addNewPosts(id, feedPosts))
    })

    Promise.all(promises)
      .finally(() => {
        clearTimeout(state.timer)
        state.timer = setTimeout(fetchNewFeedPosts, 5000)
      })
  }

  const handleInput = ({ target: { value } }) => {
    state.feed.url = value
    state.status.state = 'editing'
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { feed: { url }, feeds: { data } } = snapshot(state)
    const urlList = data.map(item => item.url)

    validate(url, urlList)
      .then(fetchData)
      .then(parse)
      .then(({ feed, feedPosts }) => {
        const feedId = addNewFeed(url, feed)
        addNewPosts(feedId, feedPosts)
      })
      .then(() => {
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
  subscribe(state.feeds, () => {
    fetchNewFeedPosts()
    updateFeedsView(snapshot(state.feeds))
  })
  subscribe(state.posts, () => updatePostsView(snapshot(state.posts)))

  render(container, snapshot(state)).then(() => {
    document.getElementById('input').addEventListener('input', handleInput)
    document.getElementById('form').addEventListener('submit', handleSubmit)
  })
}
