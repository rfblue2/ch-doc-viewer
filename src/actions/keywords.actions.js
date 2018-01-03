import { keywordsService } from '../services'
import { keywordConsts } from '../constants'

export const getGraphData = (fileIds, window, keywords, distance) => {
  const request = (fileIds, window, keywords, distance) => {
    return {
      type: keywordConsts.KEYWORD_GRAPH_DATA_REQ,
      fileIds,
      window,
      keywords,
      distance,
    }
  }
  const success = graphData => {
    return {
      type: keywordConsts.KEYWORD_GRAPH_DATA_SUCC,
      graphData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.KEYWORD_GRAPH_DATA_ERR,
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

export const getColData = (fileIds, window, keywords, scoreType) => {
  const request = (fileIds, window, keywords, scoreType) => {
    return {
      type: keywordConsts.KEYWORD_COL_REQ,
      fileIds,
      window,
      keywords,
      scoreType,
    }
  }
  const success = colData => {
    return {
      type: keywordConsts.KEYWORD_COL_SUCC,
      colData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.KEYWORD_COL_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileIds, window, keywords, scoreType))

    if (!fileIds || fileIds.length <= 0) {
      dispatch(failure('Error: No File Selected'))
      return
    }

    keywordsService.getColData(fileIds, window, keywords, scoreType).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err)))
  }
}

export const getPermData = (fileIds, keywords) => {
  const request = (fileIds, keywords) => {
    return {
      type: keywordConsts.KEYWORD_PERMS_REQ,
      fileIds,
      keywords,
    }
  }
  const success = (keywordPerms) => {
    return {
      type: keywordConsts.KEYWORD_PERMS_SUCC,
      keywordPerms,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.KEYWORD_PERMS_ERR,
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

export const getKeywordFreqData = (fileIds, n, limit) => {
  const request = (fileIds, n, limit) => {
    return {
      type: keywordConsts.KEYWORD_FREQ_REQ,
      fileIds,
      n,
      limit,
    }
  }
  const success = (keywordFreqData) => {
    return {
      type: keywordConsts.KEYWORD_FREQ_SUCC,
      keywordFreqData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.KEYWORD_FREQ_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileIds, n, limit))

    if (!fileIds ||
      fileIds.length <= 0) {
      dispatch(failure('Please select a file'))
    }

    keywordsService.getKeywordFreqData(fileIds, n, limit).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err))
    )
  }
}

export const getKeywordData = (fileIds, n) => {
  const request = (fileIds, n) => {
    return {
      type: keywordConsts.KEYWORDS_REQ,
      fileIds,
      n,
    }
  }
  const success = (keywordData) => {
    return {
      type: keywordConsts.KEYWORDS_SUCC,
      keywordData,
    }
  }

  const failure = error => {
    return {
      type: keywordConsts.KEYWORDS_ERR,
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