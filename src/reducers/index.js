import { combineReducers } from 'redux'
import editor from './editor.reducers'
import files from './files.reducers'
import keywords from './keywords.reducers'

const appReducers = combineReducers({
  files,
  editor,
  keywords,
})

export default appReducers
