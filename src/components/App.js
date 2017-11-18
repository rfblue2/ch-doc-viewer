import React, { Component } from 'react'
import $ from 'jquery';import AddFile from '../containers/AddFile'
import AppEditor from '../containers/AppEditor'
import VisibleFileList from '../containers/VisibleFileList'
import AnalysisPanel from './AnalysisPanel'
import './App.css'

import 'foundation-sites'

/**
 * Main app containing all high level components
 */
export default class App extends Component {

  componentDidMount() {
    $(document).foundation()
  }

  render() {
    return (
      <div>
        <h1>Literary Chinese Document Reader (中国古代文言小说阅读系统)</h1>
        <div className='content-container'>
            <div className='sidebar'>
              <AddFile />
              <VisibleFileList />
            </div>
            <div className='main'>
              <AppEditor />
              <AnalysisPanel />
          </div>  
        </div>
      </div>
    )
  }
}
