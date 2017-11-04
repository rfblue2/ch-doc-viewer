import { KEYWORDGRAPH_URL } from '../constants'

export const LOAD_KEYWORD_GRAPH_DATA_SUCC = 'LOAD_KEYWORD_GRAPH_DATA_SUCC'
export const LOAD_KEYWORD_GRAPH_DATA_ERR = 'LOAD_KEYWORD_GRAPH_DATA_ERR'

export const fetchKeywordGraphData = fileid => dispatch => {
  if (!fileid) {
    dispatch(loadKeywordGraphDataError('Erorr: No File Selected'))
    return
  }
  return fetch(KEYWORDGRAPH_URL + '?fileid=' + fileid,
  {
    method: 'GET',
    mode: 'cors',
  })
  .then(res => {
    if (res.ok) {
      res.json().then(json =>
        dispatch(loadKeywordGraphDataSuccess(json))
      )
    }
  })
  .catch(err => {
    dispatch(loadKeywordGraphDataError(err))
  })
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