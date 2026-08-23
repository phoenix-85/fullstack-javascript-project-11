import './style.css'

document.querySelector('#app').innerHTML = `
<header class="bg-black">
  <div class="mx-48 my-16">
    <h1>RSS агрегатор</h1>
    <p>Начните читать RSS сегодня! Это легко, это красиво.</p>
    <form class="mt-4 mb-2 flex w-full space-x-4">
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
