import { keywordsService } from '../services'
import { keywordConsts } from '../constants'

export const getGraphData = fileId => {
  const request = fileId => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileId,
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
    dispatch(request(fileId))

    if (!fileId) {
      dispatch(failure('Error: No File Selected'))
      return
    }

    keywordsService.getGraphData(fileId).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}

export const getPermData = (fileId, keywords) => {
  const request = (fileId, keywords) => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileId,
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
    dispatch(request(fileId, keywords))

    if (!fileId || !keywords) {
      dispatch(failure("Error: Require fileId and keywords"))
      return
    }

    keywordsService.getPermData(fileId, keywords).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}