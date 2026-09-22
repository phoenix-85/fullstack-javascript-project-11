import * as yup from 'yup'

export default async (url, urlList) => yup
    .string()
    .trim()
    .required('EMPTY_FIELD')
    .url('INVALID_URL')
    .notOneOf(urlList, 'ALREADY_EXISTS')
    .validate(url)
