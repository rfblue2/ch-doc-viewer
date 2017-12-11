import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getGraphData, getKeywordData } from '../actions'
import {
  Button,
} from 'react-bootstrap'
import KeywordGraph from '../components/KeywordGraph'
import KeywordViewer from '../components/KeywordViewer'

/**
 * Responsible for rendering keyword graph for full texts
 */
class KeywordGraphViewer extends Component {
  static propTypes = {
    graphData: PropTypes.object,
    error: PropTypes.object,
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    generate: PropTypes.func.isRequired,
    findKeywords: PropTypes.func.isRequired,
    keywordData: PropTypes.arrayOf(
      PropTypes.shape({
        word: PropTypes.string.isRequired,
        rank: PropTypes.number.isRequired,
      }).isRequired
    ).isRequired,
  }

  render() {
    const { generate, fileIds,
      findKeywords, keywordData } = this.props
    return (
      <div>
        <Button
          onClick={() => generate(fileIds)}>
          Keyword Graph
        </Button>
        <Button
          onClick={() => findKeywords(fileIds)}>
          Auto-identify Keywords
        </Button>
        <br/>
        <div className='row'>
          <KeywordGraph className='col-sm-10' { ...this.props } handle='viewer'/>
          <KeywordViewer className='col-sm-2' keywordData={ keywordData } />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileIds: state.files.selectedFiles.map(f => f.id),
    graphData: state.keywords.graphData,
    keywordData: state.keywords.keywordData,
    error: state.keywords.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generate: fileIds => {
      dispatch(getGraphData(fileIds))
    },
    findKeywords: fileIds => {
      dispatch(getKeywordData(fileIds, 10))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordGraphViewer)