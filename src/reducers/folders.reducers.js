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
        folderList: folders.map(f => {
          f.expanded = true
          return f
        }),
      }
    case folderConsts.ADD_FOLDER_SUCC:
      return {
        ...state,
        folderList: [
          ...state.folderList,
          {
            folder_name: foldername,
            _id: folderId,
            expanded: false,
          }
        ]
      }
    case folderConsts.DELETE_FOLDER_SUCC:
      return {
        ...state,
        folderList: state.folderList.filter(x => x._id !== folderId)
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
    case folderConsts.EXPAND_FOLDER:
      return {
        ...state,
        folderList: state.folderList.map(f => {
          if (f._id === folderId) {
            f.expanded = true
          }
          return f
        })
      }
    case folderConsts.COLLAPSE_FOLDER:
      return {
        ...state,
        folderList: state.folderList.map(f => {
          if (f._id === folderId) {
            f.expanded = false
          }
          return f
        })
      }
    default:
      return state
  }
}

export default folders