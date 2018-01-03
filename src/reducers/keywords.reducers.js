import {
  keywordConsts,
  fileConsts,
} from '../constants'

const keywords = (state = {
  permData: [],
  graphData: null,
  keywordData: [],
}, action) => {
  switch(action.type) {
    case keywordConsts.KEYWORD_GRAPH_DATA_SUCC:
      return {
        ...state,
        error: null,
        graphData: action.graphData,
      }
    case keywordConsts.KEYWORD_COL_SUCC:
      return {
        ...state,
        error: null,
        colData: action.colData,
      }
    case keywordConsts.KEYWORD_GRAPH_DATA_ERR: /* fall-thru */
    case keywordConsts.KEYWORD_COL_ERR:
    case keywordConsts.KEYWORD_PERMS_ERR:
    case keywordConsts.KEYWORD_FREQ_ERR:
    case keywordConsts.KEYWORDS_ERR:
      return {
        ...state,
        error: action.error,
      }
    case keywordConsts.KEYWORD_PERMS_SUCC:
      return {
        ...state,
        permData: action.keywordPerms,
        error: null,
      }
    case keywordConsts.KEYWORD_FREQ_SUCC:
      return {
        ...state,
        freqData: action.keywordFreqData,
        error: null,
      }
    case keywordConsts.KEYWORDS_SUCC:
      return {
        ...state,
        keywordData: action.keywordData,
      }
    case fileConsts.GET_FILE_SUCC:
    case fileConsts.SELECT_FILE_SUCC:
      return {
        ...state,
        error: null
      }
    case fileConsts.DELETE_FILE_SUCC: /* fall-thru */
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        permData: [],
        graphData: null,
        error: null,
      }
    default:
      return state
  }
}

export default keywords