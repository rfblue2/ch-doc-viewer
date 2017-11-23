import React from 'react'
import KeywordGraphViewer from '../containers/KeywordGraphViewer'
import Toolbar from '../containers/Toolbar'
import KeywordSearch from '../containers/KeywordSearch'
import {
  Tabs,
  Tab,
} from 'react-bootstrap'
import './AnalysisPanel.css'

/**
 * Contains a tabbed panel of analyses that can be done
 */
const AnalysisPanel = () => (
  <Tabs defaultActiveKey={1} animation={false} id='analysis_panel'>
    <Tab eventKey={1} title='Keyword Search'>
      <KeywordSearch />
    </Tab>
    <Tab eventKey={2} title='Keyword Graph'>
      <Toolbar />
      <KeywordGraphViewer />
    </Tab>
  </Tabs>
)

export default AnalysisPanel

