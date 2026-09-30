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
  feeds: {
    data: [],
  },
  posts: {
    data: [],
  },
  postPubDates: [],
}

app(container, initialState)
