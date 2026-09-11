import i18n from 'i18next'
import resources from './locales/index.js'
import render from './view.js'
import validate from './validation.js'
import { proxy, subscribe, snapshot } from 'valtio/vanilla'

export default async (elements, initialState = {}) => {
  const state = proxy({ ...initialState })
  const { language } = snapshot(state.ui)
  const i18nInstance = i18n.createInstance()
  await i18nInstance.init({
    lng: language,
    resources,
  })

  elements.form.addEventListener('submit', async (e) => {
    e.preventDefault()

    validate(snapshot(state))
      .then((err) => { state.ui.error = err })
      .then(() => {
        if (state.ui.error) return

        state.ui.list.push(state.data.value)
        state.data.value = ''
        state.ui.error = ''
      })
  })

  elements.input.addEventListener('input', ({ target: { value } }) => {
    state.data.value = value
  })

  subscribe(state.ui, () => render(elements, snapshot(state), i18nInstance))
}
