import { combineReducers } from 'redux'
import editor from './editor'
import files from './files'
import keywords from './keywords'

const appReducers = combineReducers({
  files,
  editor,
  keywords,
})

export default appReducers
