import { folderConsts } from '../constants'

const folders = (state = {
  folderList: [], // id, name
  selectedFolders: [], // id, name
}, action) => {
  let { type, folders, folderId, foldername } = action
  switch(type) {
    case folderConsts.GETALL_FOLDERS_SUCC:
      return {
        ...state,
        folderList: folders,
      }
    case folderConsts.ADD_FOLDER_SUCC:
      return {
        ...state,
        folderList: [
          ...state.folderList,
          {
            folder_name: foldername,
            folder_id: folderId,
          }
        ]
      }
    case folderConsts.DELETE_FOLDER_SUCC:
      return {
        ...state,
        folderList: state.folderList.filter(x => x.folder_id !== folderId)
      }
    case folderConsts.SELECT_FOLDER:
      return {
        ...state,
        selectedFolders: [
          ...state.selectedFolders,
          {
            id: folderId,
            foldername,
          }
        ]
      }
    case folderConsts.UNSELECT_FOLDER:
      return {
        ...state,
        selectedFolders: state.selectedFolders.filter(x => x.id !== folderId)
      }
    default:
      return state
  }
}

export default folders