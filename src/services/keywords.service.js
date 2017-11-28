import { buildUrl } from 'build-url'
import { handleResponse } from './helper'
import {
  KEYWORDGRAPH_URL,
  KEYWORDPERMS_URL,
} from '../constants'

const getGraphData = fileid => {
  const url = buildUrl(KEYWORDGRAPH_URL,
    { queryParams: { fileid } })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getPermData = (fileid, keywords) => {
  const url = buildUrl(KEYWORDPERMS_URL,
    { queryParams: { fileid, keywords } })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

export const keywordsService = {
  getGraphData,
  getPermData,
}