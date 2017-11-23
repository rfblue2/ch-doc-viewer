import { DOWNLOAD_FILE_SUCC } from '../actions'
import {
  LOAD_KEYWORD_GRAPH_DATA_ERR,
  LOAD_KEYWORD_GRAPH_DATA_SUCC,
  LOAD_KEYWORD_PERMS_SUCC,
  LOAD_KEYWORD_PERMS_ERR,
} from '../actions/keywords'

const keywords = (state = {}, action) => {
  switch(action.type) {
    case DOWNLOAD_FILE_SUCC:
      return {
        ...state,
        fileid: action.fileid,
      }
    case LOAD_KEYWORD_GRAPH_DATA_SUCC:
      return {
        graphData: action.graphData,
      }
    case LOAD_KEYWORD_GRAPH_DATA_ERR: /* fall-thru */
    case LOAD_KEYWORD_PERMS_ERR:
      return {
        ...state,
        error: action.error,
      }
    case LOAD_KEYWORD_PERMS_SUCC:
      return {
        ...state,
        permData: action.keywordPerms,
      }
    default:
      return state
  }
}

export default keywords