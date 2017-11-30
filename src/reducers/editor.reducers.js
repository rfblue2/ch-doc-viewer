import { ContentState, EditorState } from 'draft-js'
import { fileConsts } from '../constants'

const defaultState = {
  editorState: EditorState.createEmpty(), 
  filename: 'No File Selected',
  fileid: '',
}

const editor = (state=defaultState , action) => {
  let { type, editorState, content, filename, fileid } = action
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
        fileid,
      }
    case fileConsts.UNSELECT_FILE:
    case fileConsts.DELETE_FILE_SUCC:
      if (fileid === state.fileid) {
        return defaultState
      } else {
        return state
      }
    default:
      return state
  }
}

export default editor