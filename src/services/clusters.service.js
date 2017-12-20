import { buildUrl } from 'build-url'
import { handleResponse } from './helper'
import {
  DENDROGRAM_URL,
} from '../constants'

const getDendrogramData = (fileIds) => {
  const url = buildUrl(DENDROGRAM_URL,
    {
      queryParams: {
        file_ids: fileIds,
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

export const clustersService = {
  getDendrogramData,
}