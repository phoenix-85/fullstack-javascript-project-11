import validate from './validation.js'
import {render, updateInput, updateStatusView, updateUI} from './view.js'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'

export default async (container, initialState = {}) => {
  const state = proxy({ ...initialState })

  const handleInput = ({ target: { value } }) => {
    state.feed.value = value
    state.status.state = 'editing'
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const { feed: { value }, data: { feeds } } = snapshot(state)
    validate(value, feeds)
      .then(({ message, status }) => {
        state.message = message
        state.status.state = status
      })
      .then(() => {
        if (state.status.state === 'failed') return

        //state.data.feeds.push(value)
        state.feed.value = ''
      })
  }

  subscribe(state.context, () => updateUI())
  subscribe(state.feed, () => updateInput(snapshot(state.feed)))
  subscribe(state.status, () => updateStatusView(snapshot(state)))
  subscribe(state.data, () => {}) // Обновляем данные

  render(container, snapshot(state)).then(() => {
    document.getElementById('input').addEventListener('input', handleInput)
    document.getElementById('form').addEventListener('submit', handleSubmit)
  })
}
