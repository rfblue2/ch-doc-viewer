import React from 'react'
import KeywordGraphViewer from '../containers/KeywordGraphViewer'
import Toolbar from '../containers/Toolbar'
import './AnalysisPanel.css'

/**
 * Contains a tabbed panel of analyses that can be done
 */
const AnalysisPanel = () => (
  <div id='analysis_panel'>
    <ul className='tabs' data-tabs id='example-tabs'>
      <li className='tabs-title is-active'><a href='#keywordGraph' aria-selected='true'>Keyword Graph</a></li>
      <li className='tabs-title'><a href='#keywordPerm'>Keyword Search</a></li>
    </ul> 
    <div className='tabs-content' data-tabs-content='example-tabs'>
      <div className='tabs-panel is-active' id='keywordGraph'>
        <Toolbar />
        <KeywordGraphViewer />
      </div>
      <div className='tabs-panel' id='keywordPerm'>
        <p>Keyword Search Coming soon!</p>
      </div>
    </div>
  </div>
)

export default AnalysisPanel

