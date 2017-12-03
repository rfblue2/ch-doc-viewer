import { fileConsts } from '../constants'

const files = (state = {
  fileList: [],
  selectedFiles: [], // only ids and names
}, action) => {
  let { type, files, fileId, folderId, filename, data } = action
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
            _id: fileId,
            filename,
            folder_id: folderId,
          }
        ]
      }
    case fileConsts.UPDATE_FILE_SUCC:
      return {
        ...state,
        fileList: state.fileList.map(f => {
          if (f._id === fileId) {
            // client side update of the file list
            Object.assign(f, data)
          }
          return f
        })
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