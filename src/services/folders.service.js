import { buildUrl } from 'build-url'
import { FOLDER_URL } from "../constants/index";
import { handleResponse } from "./helper";

const getAll = () => {
  const options = { mode: 'cors' }
  const url = buildUrl(FOLDER_URL, { path: '/' })
  return fetch(url, options).then(handleResponse)
}

const remove = folderId => {
  const url = buildUrl(FOLDER_URL, { path: folderId })
  const options = {
    mode: 'cors',
    method: 'DELETE',
  }
  return fetch(url, options).then(handleResponse)
}

const add = foldername => {
  const url = buildUrl(FOLDER_URL, {
    path: '/',
    queryParams: {
      folder_name: foldername,
    }
  })
  const options = {
    mode: 'cors',
    method: 'POST',
  }
  return fetch(url, options).then(handleResponse)
}

export const foldersService = {
  getAll,
  remove,
  add,
}