import axios from "axios"

export default (url) => {
  return axios(`https://allorigins.hexlet.app/get?disableCache=true&url=${encodeURIComponent(url)}`)
    .then(res => res.data.contents)
}