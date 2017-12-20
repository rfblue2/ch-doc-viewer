import {
  clustersConsts,
  fileConsts,
} from '../constants'

const clusters = (state = {
  dendrogramData: null,
}, action) => {
  switch(action.type) {
    case clustersConsts.LOAD_DENDROGRAM_SUCC:
      return {
        ...state,
        error: null,
        dendrogramData: action.dendrogramData,
      }
    case clustersConsts.LOAD_DENDROGRAM_ERR:
      return {
        ...state,
        error: action.error,
      }
    case fileConsts.GET_FILE_SUCC:
    case fileConsts.SELECT_FILE_SUCC:
      return {
        ...state,
        error: null,
      }
    case fileConsts.DELETE_FILE_SUCC:
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        dendrogramData: null,
        error: null,
      }
    default: return state
  }
}

export default clusters