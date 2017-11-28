import { buildUrl } from 'build-url'
import {
  keywordConsts,
  KEYWORDGRAPH_URL,
  KEYWORDPERMS_URL,
} from '../constants'

export const fetchKeywordGraphData = fileid => dispatch => {
  if (!fileid) {
    dispatch(loadKeywordGraphDataError('Error: No File Selected'))
    return
  }
  return fetch(KEYWORDGRAPH_URL + '?fileid=' + fileid, { mode: 'cors' })
  .then(res => res.json())
  .then(json => dispatch(loadKeywordGraphDataSuccess(json)))
  .catch(err => dispatch(loadKeywordGraphDataError(err)))
}

export const loadKeywordGraphDataSuccess = graphData => {
  return {
    type: keywordConsts.LOAD_KEYWORD_GRAPH_DATA_SUCC,
    graphData,
  }
}

export const loadKeywordGraphDataError = error => {
  return {
    type: keywordConsts.LOAD_KEYWORD_GRAPH_DATA_ERR,
    error,
  }
}

export const fetchKeywordPerms = (fileid, keywords) => dispatch => {
  if (!fileid || !keywords) {
    dispatch(loadKeywordPermsError("Error: Require fileid and keywords"))
    return
  }
  const url = buildUrl(KEYWORDPERMS_URL, 
    { queryParams: { fileid, keywords } })
  return fetch(url, { mode: 'cors' })
    .then(res => res.json())
    .then(json => dispatch(loadKeywordPermsSuccess(json)))
    .catch(err => dispatch(loadKeywordPermsError(err)))
}

export const loadKeywordPermsSuccess = keywordPerms => {
  return {
    type: keywordConsts.LOAD_KEYWORD_PERMS_SUCC,
    keywordPerms,
  }
}

export const loadKeywordPermsError = error => {
  return {
    type: keywordConsts.LOAD_KEYWORD_PERMS_ERR,
    error,
  }
}