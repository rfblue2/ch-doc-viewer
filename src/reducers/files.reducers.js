import { fileConsts } from '../constants'

const files = (state = {
  filelist: [],
  selectedId: '',
}, action) => {
  let { type, files, fileid, filename } = action
  switch (type) {
    case fileConsts.GETALL_FILES_SUCC:
      return {
        ...state,
        filelist: files,
      }
    case fileConsts.UPLOAD_FILE_SUCC:
      return {
        ...state,
        filelist: [
          ...state.filelist,
          {
            filename: filename,
            _id: fileid,
          }
        ]
      }
    case fileConsts.DELETE_FILE_SUCC:
      return {
        ...state,
        filelist: state.filelist.filter(x => x._id !== fileid),
      }
    case fileConsts.GET_FILE_SUCC:
      return {
        ...state,
        selectedId: fileid,
      }
    default:
      return state
  }
}

export default files