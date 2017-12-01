import {
  keywordConsts,
  fileConsts,
} from '../constants'

const keywords = (state = {
  permData: [],
  graphData: null,
}, action) => {
  switch(action.type) {
    case keywordConsts.LOAD_KEYWORD_GRAPH_DATA_SUCC:
      return {
        ...state,
        error: null,
        graphData: action.graphData,
      }
    case keywordConsts.LOAD_KEYWORD_GRAPH_DATA_ERR: /* fall-thru */
    case keywordConsts.LOAD_KEYWORD_PERMS_ERR:
      return {
        ...state,
        error: action.error,
      }
    case keywordConsts.LOAD_KEYWORD_PERMS_SUCC:
      return {
        ...state,
        permData: action.keywordPerms,
      }
    case fileConsts.DELETE_FILE_SUCC: /* fall-thru */
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        permData: [],
        graphData: null,
      }
    default:
      return state
  }
}

export default keywords