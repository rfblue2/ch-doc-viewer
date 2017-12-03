import { ContentState, EditorState } from 'draft-js'
import { fileConsts } from '../constants'
import { folderConsts } from '../constants'

const defaultState = {
  editorState: EditorState.createEmpty(), 
  filename: 'No File Selected',
  visibleFileId: null,
}

const editor = (state=defaultState , action) => {
  let { type, editorState, content, filename, fileId } = action
  switch (type) {
    case 'UPDATE_EDITOR_STATE':
      return {
        ...state,
        editorState,
      }
    case fileConsts.GET_FILE_SUCC:
      editorState = EditorState.createWithContent(ContentState.createFromText(content))
      return {
        ...state,
        editorState,
        filename,
        visibleFileId: fileId,
      }
    case fileConsts.UNSELECT_FILE:
    case fileConsts.DELETE_FILE_SUCC:
      if (fileId === state.visibleFileId) {
        return defaultState
      } else {
        return state
      }
    case folderConsts.UNSELECT_FOLDER:
      return defaultState
    default:
      return state
  }
}

export default editor