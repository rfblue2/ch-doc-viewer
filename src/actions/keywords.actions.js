import { keywordsService } from '../services'
import { keywordConsts } from '../constants'

export const getGraphData = fileid => {
  const request = fileid => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileid,
    }
  }
  const success = graphData => {
    return {
      type: keywordConsts.LOAD_KEYWORD_GRAPH_DATA_SUCC,
      graphData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.LOAD_KEYWORD_GRAPH_DATA_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileid))

    if (!fileid) {
      dispatch(failure('Error: No File Selected'))
      return
    }

    keywordsService.getGraphData(fileid).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}

export const getPermData = (fileid, keywords) => {
  const request = (fileid, keywords) => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileid,
      keywords,
    }
  }
  const success = keywordPerms => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_SUCC,
      keywordPerms,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileid, keywords))

    if (!fileid || !keywords) {
      dispatch(failure("Error: Require fileid and keywords"))
      return
    }

    keywordsService.getPermData(fileid, keywords).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}