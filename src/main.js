import './style.css'
import * as yup from 'yup'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'

const elements = {
  form: document.getElementById('rss-form'),
  input: document.getElementById('rss-input'),
  error: document.getElementById('error'),
}

const state = proxy({
  form: {
    input: '',
    error: '',
  },
  list: [],
})

const validate = (url, list) => {
  const schema = yup
    .string()
    .trim()
    .required('Не должно быть пустым')
    .url('Ссылка должна быть валидным URL')
    .notOneOf(list, 'Такой адрес уже существует')

  schema
    .validate(url)
    .then(() => state.form.error = '')
    .catch(error => state.form.error = error.message)
}

elements.form.addEventListener('submit', (e) => {
  e.preventDefault()

  validate(state.form.input, state.list)

  if (state.form.error === '') {
    state.list.push(state.form.input)
    state.form.input = ''
    state.form.error = ''
  }
})

elements.input.addEventListener('input', (e) => {
  state.form.input = e.target.value
})

subscribe(state.form, () => {
  const { error } = snapshot(state.form)
  elements.error.textContent = error
  elements.input.classList.toggle('border-red-600', error !== '')
})
