import './style.css'

document.querySelector('#app').innerHTML = `
<header class="flex flex-col m-auto max-w-7xl text-white bg-black">
  <div class="mx-48 my-8 space-y-2">
    <h1 class="text-5xl">RSS агрегатор</h1>
    <p>Начните читать RSS сегодня! Это легко, это красиво.</p>
    <form class="flex w-full space-x-4">
      <input
        type="text"
        class="flex-3 form-input rounded-sm"
        placeholder="Ссылка RSS"
        name="rss"
      >
      
      <button
        type="submit"
        class="flex-1 bg-blue-600 rounded-sm"
        name="submit"
      >
        Добавить
      </button>
    </form>
    <p class="text-gray-500 text-sm">
      Пример: https://lorem-rss.hexlet.app/feed
    </p>
  </div>
</header>
`
