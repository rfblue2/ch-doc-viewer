import { ContentState, EditorState } from 'draft-js'
import {
  DOWNLOAD_FILE_SUCC,
} from '../actions'

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
    default:
      return state
  }
}

export default editor