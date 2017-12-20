import { combineReducers } from 'redux'
import editor from './editor.reducers'
import files from './files.reducers'
import folders from './folders.reducers'
import keywords from './keywords.reducers'
import clusters from './clusters.reducers'

const appReducers = combineReducers({
  files,
  folders,
  editor,
  keywords,
  clusters,
})

export default appReducers
