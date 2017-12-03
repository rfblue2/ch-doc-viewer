import React from 'react'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import AddFile from '../containers/AddFile'
import AddFolder from '../containers/AddFolder'
import AppEditor from '../containers/AppEditor'
import VisibleFileList from '../containers/VisibleDirectory'
import AnalysisPanel from './AnalysisPanel'
import {
  Panel,
} from 'react-bootstrap'
import './App.css'

/**
 * Main app containing all high level components
 */
const App = () => (
  <div>
    <div className='jumbotron'>
      <div className='container'>
        <h2>Literary Chinese Document Reader (中国古代文言小说阅读系统)</h2>
      </div>
    </div>
    <div className='content-container'>
      <Panel>
        <AddFolder />
        <AddFile />
        <VisibleFileList />
      </Panel>
      <Panel>
        <AppEditor />
        <AnalysisPanel />
      </Panel>
    </div>
  </div>
)

export default DragDropContext(HTML5Backend)(App)