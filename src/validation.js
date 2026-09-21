import * as yup from 'yup'

export default async (feed, feeds) => yup
    .string()
    .trim()
    .required('EMPTY_FIELD')
    .url('INVALID_URL')
    .notOneOf(feeds, 'ALREADY_EXISTS')
    .validate(feed)
