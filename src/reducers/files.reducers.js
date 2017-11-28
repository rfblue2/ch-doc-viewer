import { fileConsts } from '../constants'

const files = (state = [], action) => {
  switch (action.type) {
    case fileConsts.GETALL_FILES_SUCC:
      return action.files
    case fileConsts.UPLOAD_FILE_SUCC:
      return [
        ...state,
        {
          filename: action.filename,
          _id: action.fileid,
        }
      ]
    case fileConsts.DELETE_FILE_SUCC:
      return state.filter(x => x._id !== action.fileid)
    case fileConsts.UPLOAD_FILE_ERR:
      return state
    default:
      return state
  }
}

export default files