import { DOWNLOAD_FILE_SUCC } from '../actions'
import {
  LOAD_KEYWORD_GRAPH_DATA_ERR,
  LOAD_KEYWORD_GRAPH_DATA_SUCC,
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
    case LOAD_KEYWORD_GRAPH_DATA_ERR:
      return {
        ...state,
        error: action.error
      }
    default:
      return state
  }
}

export default keywords