import * as yup from 'yup'

export default async (state) => yup
    .string()
    .trim()
    .required('empty_field')
    .url('invalid_url')
    .notOneOf(state.ui.list, 'already_exists')
    .validate(state.data.value)
    .then(() => '')
    .catch(err => err.message)
