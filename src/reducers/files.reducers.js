import { fileConsts } from '../constants'
import { folderConsts } from '../constants'

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
      // TODO find some smart way to hold only ids or alternatively hold folders
      return {
        ...state,
        selectedFiles: [
          ...state.selectedFiles,
          {
            id: fileId,
            filename,
          }
        ],
      }
    case fileConsts.UNSELECT_FILE:
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(x => x.id !== fileId),
      }
    case folderConsts.SELECT_FOLDER:
      // selecting a folder selects all the files in that folder
      return {
        ...state,
        selectedFiles: [
          ...state.selectedFiles,
          ...state.fileList
            .filter(f => {
              // if already included in selected files don't duplicate
              for (let file of state.selectedFiles) {
                if (file.id === f._id) {
                  return false
                }
              }
              return f.folder_id === folderId
            })
            .map(f => {
              return {
                id: f._id,
                filename: f.filename,
                folder_id: f.folder_id,
              }
            })
        ],
      }
    case folderConsts.UNSELECT_FOLDER:
      // unselecting a folder unselects all the files in that folder
      return {
        ...state,
        selectedFiles: state.selectedFiles.filter(f => {
          // Check if file folder id is the current folder id
          for (let file of state.fileList) {
            if (file._id === f.id) {
              return file.folder_id !== folderId
            }
          }
          return false
        })
      }
    default:
      return state
  }
}

export default files