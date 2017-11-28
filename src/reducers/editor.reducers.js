import { ContentState, EditorState } from 'draft-js'
import {
  DOWNLOAD_FILE_SUCC,
  DELETE_FILE_SUCC,
} from '../constants'

const defaultState = {
  editorState: EditorState.createEmpty(), 
  filename: 'No File Selected'
}

const editor = (state=defaultState , action) => {
  let { type, editorState, content, filename } = action
  switch (type) {
    case 'UPDATE_EDITOR_STATE':
      return {
        ...state,
        editorState,
      }
    case DOWNLOAD_FILE_SUCC:
      editorState = EditorState.createWithContent(ContentState.createFromText(content))
      return {
        ...state,
        editorState,
        filename,
      }
    case DELETE_FILE_SUCC:
      return defaultState
    default:
      return state
  }
}

export default editor