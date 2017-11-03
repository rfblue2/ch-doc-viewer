import {
  DELETE_FILE_SUCC,
  LOAD_FILES_SUCC,
  UPLOAD_FILE_ERR,
  UPLOAD_FILE_SUCC,
} from '../actions'

const files = (state = [], action) => {
  switch (action.type) {
    case LOAD_FILES_SUCC:
      return action.files
    case UPLOAD_FILE_SUCC:
      return [
        ...state,
        {
          filename: action.filename,
          _id: action.fileid,
        }
      ]
    case DELETE_FILE_SUCC:
      return state.filter(x => x._id !== action.fileid)
    case UPLOAD_FILE_ERR:
      return state
    default:
      return state
  }
}

export default files