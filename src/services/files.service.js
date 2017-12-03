import { buildUrl } from 'build-url'
import { FILE_URL } from '../constants'
import { handleResponse } from './helper'

const get = id => {
  const url =  buildUrl(FILE_URL, { path: id })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getAll = folderIds => {
  const options = { mode: 'cors' }
  const url =  buildUrl(FILE_URL, { path: '/' })
  if (folderIds && folderIds.length > 0) {
    url.queryParams = { folder_ids: folderIds}
  }
  return fetch(url, options).then(handleResponse)
}

const upload = file => {
  let form = new FormData()
  form.append('file', file)
  const url =  buildUrl(FILE_URL, { path: '/' })
  const options = {
    mode: 'cors',
    method: 'POST',
    body: form,
  }
  return fetch(url, options).then(handleResponse)
}

// data should be metadata in form of key-value
const update = (id, data) => {
  let form = new FormData()
  for (let key in data) {
    form.append(key, data[key])
  }
  const url = buildUrl(FILE_URL, { path: id})
  const options = {
    mode: 'cors',
    method: 'PUT',
    body: form,
  }
  return fetch(url, options).then(handleResponse)
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
  update,
  remove,
}