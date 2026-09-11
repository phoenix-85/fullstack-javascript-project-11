import './style.css'
import app from './app'

const elements = {
  title: document.getElementById('title'),
  description: document.getElementById('description'),
  form: document.getElementById('form'),
  input: document.getElementById('input'),
  submit: document.getElementById('submit'),
  error: document.getElementById('error'),
  hint: document.getElementById('hint'),
}

const initialState = {
  ui: {
    language: 'ru',
    error: '',
    list: [],
  },
  data: {
    value: '',
  },
}

app(elements, initialState)
