import { buildUrl } from 'build-url'
import { FILE_URL } from '../constants'
import { handleResponse } from './helper'

const get = id => {
  const url =  buildUrl(FILE_URL, { path: id })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getAll = () => {
  const options = { mode: 'cors' }
  return fetch(FILE_URL, options).then(handleResponse)
}

const upload = file => {
  var form = new FormData()
  form.append('file', file)
  const options = {
    mode: 'cors',
    method: 'POST',
    body: form,
  }
  return fetch(FILE_URL, options).then(handleResponse)
}

const remove = id => {
  const url =  buildUrl(FILE_URL, { path: id })
  const options = {
    mode: 'cors',
    method: 'DELETE',
  }
  return fetch(url, options).then(handleResponse)
}

export const filesService = {
  get,
  getAll,
  upload,
  remove,
}