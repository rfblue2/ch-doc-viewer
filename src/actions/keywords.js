import { 
  KEYWORDGRAPH_URL,
  KEYWORDPERMS_URL,
} from '../constants'
import { RestURLBuilder } from 'rest-url-builder'
 
export const LOAD_KEYWORD_GRAPH_DATA_SUCC = 'LOAD_KEYWORD_GRAPH_DATA_SUCC'
export const LOAD_KEYWORD_GRAPH_DATA_ERR = 'LOAD_KEYWORD_GRAPH_DATA_ERR'
export const LOAD_KEYWORD_PERMS_SUCC = 'LOAD_KEYWORD_PERMS_SUCC'
export const LOAD_KEYWORD_PERMS_ERR = 'LOAD_KEYWORD_PERMS_ERR'

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
    type: LOAD_KEYWORD_GRAPH_DATA_SUCC,
    graphData,
  }
}

export const loadKeywordGraphDataError = error => {
  return {
    type: LOAD_KEYWORD_GRAPH_DATA_ERR,
    error,
  }
}

export const fetchKeywordPerms = (fileid, keywords) => dispatch => {
  if (!fileid || !keywords) {
    dispatch(loadKeywordPermsError("Error: Require fileid and keywords"))
    return
  }
  let builder = new RestURLBuilder()
  builder.buildRestURL(KEYWORDPERMS_URL)
  builder.setQueryParameter('fileid', fileid)
  builder.setQueryParameter('keywords', keywords)
  return fetch(builder.get(), { mode: 'cors' })
    .then(res => res.json())
    .then(json => dispatch(loadKeywordPermsSuccess(json)))
    .catch(err => dispatch(loadKeywordPermsError(err)))
}

export const loadKeywordPermsSuccess = keywordPerms => {
  return {
    type: LOAD_KEYWORD_PERMS_SUCC,
    keywordPerms,
  }
}

export const loadKeywordPermsError = error => {
  return {
    type: LOAD_KEYWORD_PERMS_ERR,
    error,
  }
}