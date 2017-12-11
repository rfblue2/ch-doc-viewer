import { keywordsService } from '../services'
import { keywordConsts } from '../constants'

export const getGraphData = (fileIds, window, keywords, distance) => {
  const request = (fileIds, window, keywords, distance) => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileIds,
      window,
      keywords,
      distance,
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
    dispatch(request(fileIds, window, keywords, distance))

    if (!fileIds || fileIds.length <= 0) {
      dispatch(failure('Error: No File Selected'))
      return
    }

    keywordsService.getGraphData(fileIds, window, keywords, distance).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}

export const getPermData = (fileIds, keywords) => {
  const request = (fileIds, keywords) => {
    return {
      type: keywordConsts.LOAD_KEYWORD_PERMS_REQ,
      fileIds,
      keywords,
    }
  }
  const success = (keywordPerms) => {
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
    dispatch(request(fileIds))

    if (!fileIds ||
        fileIds.length <= 0 ||
        !keywords ||
        keywords.length <= 0) {
      dispatch(failure('Please select a file and enter a keyword'))
      return
    }

    keywordsService.getPermData(fileIds, keywords).then(
      data => dispatch(success(data, keywords)),
      err => dispatch(failure(err)))
  }
}

export const getKeywordData = (fileIds, n) => {
  const request = (fileIds, n) => {
    return {
      type: keywordConsts.LOAD_KEYWORDS_REQ,
      fileIds,
      n,
    }
  }
  const success = (keywordData) => {
    return {
      type: keywordConsts.LOAD_KEYWORDS_SUCC,
      keywordData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.LOAD_KEYWORDS_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileIds, n))

    if (!fileIds ||
      fileIds.length <= 0) {
      dispatch(failure('Please select a file'))
      return
    }

    keywordsService.getKeywordData(fileIds, n).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}