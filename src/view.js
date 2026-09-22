import i18next from 'i18next'
import resources from './locales/index.js'

const i18n = i18next.createInstance()

const elements = {
  header: document.createElement('header'),
  headerDiv: document.createElement('div'),
  headerTitle: document.createElement('h1'),
  headerDescription: document.createElement('p'),
  headerForm: document.createElement('form'),
  formInput: document.createElement('input'),
  formSubmit: document.createElement('button'),
  formHint: document.createElement('p'),
  formMessage: document.createElement('p'),
  main: document.createElement('main'),
  mainPosts: document.createElement('section'),
  mainPostsTitle: document.createElement('h2'),
  mainPostsDiv: document.createElement('div'),
  mainFeeds: document.createElement('section'),
  mainFeedsTitle: document.createElement('h2'),
  mainFeedsDiv: document.createElement('div'),
}

const render = async (container, state) => {
  const { context: { language }, feed } = state
  await i18n.init({
    lng: language,
    resources,
  })

  const {
    header,
    headerDiv,
    headerTitle,
    headerDescription,
    headerForm,
    formInput,
    formSubmit,
    formHint,
    formMessage,
    main,
    mainPosts,
    mainPostsTitle,
    mainPostsDiv,
    mainFeeds,
    mainFeedsTitle,
    mainFeedsDiv,
  } = elements

  container.classList.add('container', 'mx-auto', 'flex', 'flex-col')
  header.classList.add('px-48', 'py-8', 'text-white', 'bg-slate-800')
  headerDiv.classList.add('space-y-2')
  headerTitle.classList.add('text-5xl')

  headerForm.classList.add('flex', 'gap-x-4')
  headerForm.id = 'form'

  formInput.classList.add('w-full', 'text-black', 'rounded-sm')
  formInput.autofocus = true
  formInput.id = 'input'
  formInput.type = 'text'

  formSubmit.classList.add('btn', 'btn-primary')
  formSubmit.id = 'submit'
  formSubmit.type = 'submit'

  formHint.classList.add('text-gray-400', 'text-sm')
  formMessage.classList.add('text-sm')

  main.classList.add('flex', 'gap-x-8', 'px-24', 'py-8')

  mainPosts.classList.add('flex', 'flex-col', 'flex-3', 'p-4', 'border', 'border-gray-200')
  mainPostsTitle.classList.add('text-2xl', 'semibold')

  mainFeeds.classList.add('flex', 'flex-col', 'flex-1', 'p-4', 'border', 'border-gray-200')
  mainFeedsTitle.classList.add('text-2xl', 'semibold')

  headerForm.append(formInput, formSubmit)
  headerDiv.append(headerTitle, headerDescription, headerForm, formHint, formMessage)
  header.append(headerDiv)

  mainPosts.append(mainPostsTitle, mainPostsDiv)
  mainFeeds.append(mainFeedsTitle, mainFeedsDiv)
  main.append(mainPosts, mainFeeds)

  container.append(header, main)

  updateUI()
  updateInput(feed)
}

const updateUI = () => {
  elements.headerTitle.textContent = i18n.t($ => $.ui.title)
  elements.headerDescription.textContent = i18n.t($ => $.ui.description)
  elements.formInput.placeholder = i18n.t($ => $.ui.placeholder)
  elements.formSubmit.textContent = i18n.t($ => $.ui.submit)
  elements.formHint.textContent = i18n.t($ => $.ui.hint)
  elements.mainPostsTitle.textContent = i18n.t($ => $.ui.posts)
  elements.mainFeedsTitle.textContent = i18n.t($ => $.ui.feeds)
}

const updateStatusView = ({ status, message }) => {
  switch (status.state) {
    case 'success':
      elements.formMessage.classList.add('text-green-600')
      elements.formMessage.textContent = i18n.t($ => $.message[message])
      break
    case 'failed':
      elements.formInput.classList.add('error')
      elements.formMessage.classList.add('text-red-600')
      elements.formMessage.textContent = i18n.t($ => $.message[message])
      break
    default:
      elements.formInput.classList.remove('error')
      elements.formMessage.classList.remove('text-green-600', 'text-red-600')
      elements.formMessage.textContent = ''
  }
}

const updateInput = ({ url }) => {
  elements.formInput.value = url
}

const updateDataView = ({ posts, feeds }) => {
  const newPosts = posts.map(post => {
    const el= document.createElement('div')
    el.textContent = post.title
    return el
  })

  const newFeeds = feeds.map(feed => {
    const el= document.createElement('div')
    el.textContent = feed.title
    return el
  })

  elements.mainPostsDiv.replaceChildren(...newPosts)
  elements.mainFeedsDiv.replaceChildren(...newFeeds)
}

export { render, updateUI, updateStatusView, updateInput, updateDataView }