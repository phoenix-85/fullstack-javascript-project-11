export default (content) => {
  const xml = new DOMParser()
    .parseFromString(content, 'text/xml')

  if (xml.querySelector('parsererror')) throw new Error('PARSER_ERROR')

  const channel = xml.documentElement.firstChild

  const feed = {
    title: channel.querySelector('title').textContent,
    description: channel.querySelector('description').textContent,
  }

  const feedPosts = [...channel.querySelectorAll('item')].map(item => ({
    title: item.querySelector('title')?.textContent?.trim(),
    link: item.querySelector('link')?.textContent?.trim(),
    description: item.querySelector('description')?.textContent?.trim(),
    pubDate: item.querySelector('pubDate')?.textContent?.trim(),
  }))

  return { feed, feedPosts }
}