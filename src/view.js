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
  mainPostsTitle.classList.add('text-2xl', 'bold', 'mb-4')
  mainPostsDiv.classList.add('flex', 'flex-col', 'gap-y-2')

  mainFeeds.classList.add('flex', 'flex-col', 'flex-1', 'p-4', 'border', 'border-gray-200')
  mainFeedsTitle.classList.add('text-2xl', 'bold', 'mb-4')
  mainFeedsDiv.classList.add('flex', 'flex-col', 'gap-y-2')

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

const updateFeedsView = ({ data }) => {
  const newFeeds = data.map(feed => {
    const el= document.createElement('div')
    const feedTitle = document.createElement('h3')
    feedTitle.textContent = feed.title
    el.appendChild(feedTitle)
    return el
  })

  elements.mainFeedsDiv.replaceChildren(...newFeeds)
}

const updatePostsView = ({ data }, handleSeen) => {
  const newPosts = data.map((post, postId) => {
    const el= document.createElement('div')
    el.dataset.seen = post.seen
    el.classList.add('flex', 'justify-between', 'items-center', 'px-4', 'py-2', 'border', 'border-gray-200')
    el.classList.toggle('font-bold', !post.seen)
    el.textContent = post.title

    const buttonView = document.createElement('button')
    buttonView.classList.add('btn', 'btn-secondary')
    buttonView.textContent = i18n.t($ => $.ui.view)
    buttonView.addEventListener('click', () => {
      handleSeen(postId)

      modal(post).showModal()
    })

    el.appendChild(buttonView)
    return el
  }).reverse()

  elements.mainPostsDiv.replaceChildren(...newPosts)
}

const modal = (post) => {
  const closeModal = () => {
    modalPostView.close()
    modalPostView.remove()
  }

  const modalPostView = document.createElement('dialog')
  modalPostView.classList.add('m-auto', 'p-6', 'rounded-md')

  const formModalPostView = document.createElement('form')
  formModalPostView.classList.add('flex', 'flex-col', 'gap-y-4')
  formModalPostView.method = 'dialog'

  const headerModalPostView = document.createElement('div')
  headerModalPostView.classList.add('flex', 'justify-between', 'font-bold')
  headerModalPostView.textContent = post.title

  const bodyModalPostView = document.createElement('div')
  bodyModalPostView.textContent = post.description
  bodyModalPostView.dataset.test = 'modal-body'

  const buttonsModalPostView = document.createElement('div')
  buttonsModalPostView.classList.add('flex', 'justify-end', 'gap-x-4')

  const openButton  = document.createElement('a')
  openButton.classList.add('btn', 'btn-primary')
  openButton.textContent = i18n.t($ => $.ui.open)
  openButton.href = post.link

  const closeButton  = document.createElement('button')
  closeButton.classList.add('btn', 'btn-secondary')
  closeButton.textContent = i18n.t($ => $.ui.close)
  closeButton.addEventListener('click', () => closeModal)

  const crossButton = document.createElement('button')
  crossButton.classList.add('h-5', 'w-5')
  crossButton.textContent = 'X'
  crossButton.addEventListener('click', () => closeModal)

  headerModalPostView.appendChild(crossButton)
  buttonsModalPostView.append(openButton, closeButton)
  formModalPostView.append(headerModalPostView, bodyModalPostView, buttonsModalPostView)
  modalPostView.append(formModalPostView)

  document.body.appendChild(modalPostView)

  return modalPostView
}

export { render, updateUI, updateStatusView, updateInput, updateFeedsView , updatePostsView}