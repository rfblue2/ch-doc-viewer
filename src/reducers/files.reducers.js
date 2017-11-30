import { fileConsts } from '../constants'

const files = (state = {
  fileList: [],
  selectedFiles: [], // only ids and names
}, action) => {
  let { type, files, fileId, filename } = action
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
            _id: fileId,
          }
        ]
      }
    case fileConsts.DELETE_FILE_SUCC:
      return {
        ...state,
        fileList: state.fileList.filter(x => x._id !== fileId),
      }
    case fileConsts.SELECT_FILE_SUCC:
      return {
        ...state,
        selectedFiles: [
          ...state.selectedFiles,
          {
            id: fileId,
            filename,
          },
        ],
      }
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(x => x.id !== fileId),
      }
    default:
      return state
  }
}

export default files