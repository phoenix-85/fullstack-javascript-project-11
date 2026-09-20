import * as yup from 'yup'

export default async (feed, feeds) => yup
    .string()
    .trim()
    .required('empty_field')
    .url('invalid_url')
    .notOneOf(feeds, 'already_exists')
    .validate(feed)
    .then(() => ({ message: 'success', status: 'success' }))
    .catch(err => ({ message: err.message, status: 'failed' }))
