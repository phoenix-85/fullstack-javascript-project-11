export default (elements, state, i18nInstance) => {
  const { ui: { error }, data: { value } } = state

  elements.title.textContent = i18nInstance.t($ => $.ui.title)
  elements.description.textContent = i18nInstance.t($ => $.ui.description)

  elements.input.classList.toggle('error', error)
  elements.input.placeholder = i18nInstance.t($ => $.ui.placeholder)
  elements.input.value = value

  elements.error.textContent = error ? i18nInstance.t($ => $.errors[error]) : ''

  elements.hint.textContent = i18nInstance.t($ => $.ui.hint)
  elements.submit.textContent = i18nInstance.t($ => $.ui.submit)
}
