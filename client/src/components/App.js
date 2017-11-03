import React from 'react'
import AddFile from '../containers/AddFile'
import AppEditor from '../containers/AppEditor'
import KeywordGraphViewer from '../containers/KeywordGraphViewer'
import Toolbar from '../containers/Toolbar'
import VisibleFileList from '../containers/VisibleFileList'
import './App.css'

/**
 * Main app containing all high level components
 */
const App = () => (
  <div>
    <h1>Chinese Document Viewer (中文文件读机)</h1>
    <div className='global-container'>
        <div className='sidebar'>
          <AddFile />
          <VisibleFileList />
        </div>
        <div className='main'>
          <AppEditor />
          <Toolbar />
          <KeywordGraphViewer />
      </div>  
    </div>
  </div>
)

export default App