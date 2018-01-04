import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getGraphData, getKeywordData } from '../actions'
import {
  Button,
  ControlLabel,
  Row,
  Col,
} from 'react-bootstrap'
import NumberSpinner from '../components/NumberSpinner'
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

  constructor(props) {
    super(props)
    this.state = { window: 2 }
  }

  handleSpinner(count) {
    this.setState({ window: count })
  }

  getWindowSize() {
    return this.state.window
  }

  render() {
    const { generate, fileIds,
      findKeywords, keywordData } = this.props
    return (
      <div>
        <Button
          onClick={() => generate(fileIds, this.getWindowSize())}>
          Keyword Graph
        </Button>
        <Button
          onClick={() => findKeywords(fileIds)}>
          Auto-identify Keywords
        </Button>
        <br/>
        <Row>
          <Col xs={6}>
            <ControlLabel>Window Size</ControlLabel>
            <NumberSpinner min={2} max={10} onChange={this.handleSpinner.bind(this)}/>
          </Col>
        </Row>
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
    generate: (fileIds, window) => {
      dispatch(getGraphData(fileIds, window))
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