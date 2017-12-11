import { buildUrl } from 'build-url'
import { handleResponse } from './helper'
import {
  KEYWORDGRAPH_URL,
  KEYWORDPERMS_URL,
  KEYWORDS_URL,
} from '../constants'

const getGraphData = (fileIds, window, keywords, distance) => {
  const url = buildUrl(KEYWORDGRAPH_URL,
    { 
      queryParams: { 
        file_ids: fileIds,
        ...window && {window},
        ...keywords && {keywords},
        ...distance && {distance},
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getPermData = (fileIds, keywords) => {
  const url = buildUrl(KEYWORDPERMS_URL,
    { 
      queryParams: { 
        file_ids: fileIds,
        keywords,
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getKeywordData = (fileIds, n) => {
  const url = buildUrl(KEYWORDS_URL,
    {
      queryParams: {
        file_ids: fileIds,
        n
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}
export const keywordsService = {
  getGraphData,
  getPermData,
  getKeywordData,
}