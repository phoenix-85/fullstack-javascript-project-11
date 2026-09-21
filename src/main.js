import './style.css'
import app from './app'

const container = document.getElementById('app')

const initialState = {
  context: {
    language: 'ru',
  },
  feed: {
    url: '',
  },
  status: {
    state: 'editing',
  },
  message: '',
  data: {
    feeds: [],
    posts: {},
  },
}

app(container, initialState)
