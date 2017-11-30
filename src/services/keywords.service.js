import { buildUrl } from 'build-url'
import { handleResponse } from './helper'
import {
  KEYWORDGRAPH_URL,
  KEYWORDPERMS_URL,
} from '../constants'

const getGraphData = fileId => {
  const url = buildUrl(KEYWORDGRAPH_URL,
    { 
      queryParams: { 
        fileids: [fileId],
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

const getPermData = (fileIds, keywords) => {
  const url = buildUrl(KEYWORDPERMS_URL,
    { 
      queryParams: { 
        fileids: fileIds,
        keywords,
      }
    })
  const options = { mode: 'cors' }
  return fetch(url, options).then(handleResponse)
}

export const keywordsService = {
  getGraphData,
  getPermData,
}