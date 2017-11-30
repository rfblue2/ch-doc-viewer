import { fileConsts } from '../constants'

const files = (state = {
  fileList: [],
  selectedFiles: [], // only ids and names
}, action) => {
  let { type, files, fileid, filename } = action
  switch (type) {
    case fileConsts.GETALL_FILES_SUCC:
      return {
        ...state,
        fileList: files,
      }
    case fileConsts.UPLOAD_FILE_SUCC:
      return {
        ...state,
        fileList: [
          ...state.fileList,
          {
            filename: filename,
            _id: fileid,
          }
        ]
      }
    case fileConsts.DELETE_FILE_SUCC:
      return {
        ...state,
        fileList: state.fileList.filter(x => x._id !== fileid),
      }
    case fileConsts.SELECT_FILE_SUCC:
      return {
        ...state,
        selectedFiles: [
          ...state.selectedFiles,
          {
            id: fileid,
            filename,
          },
        ],
      }
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(x => x.id !== fileid),
      }
    default:
      return state
  }
}

export default files