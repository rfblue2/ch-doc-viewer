import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getGraphData } from '../actions'
import {
  Button,
} from 'react-bootstrap'
import KeywordGraph from '../components/KeywordGraph'

/**
 * Responsible for rendering keyword graph for full texts
 */
class KeywordGraphViewer extends Component {
  static propTypes = {
    graphData: PropTypes.object,
    error: PropTypes.object,
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    generate: PropTypes.func.isRequired,
  }

  render() {
    const { generate, fileIds } = this.props
    return (
      <div>
        <Button
          onClick={() => generate(fileIds)}>
          Keyword Graph
        </Button>
        <br/>
        <KeywordGraph { ...this.props } handle='viewer'/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileIds: state.files.selectedFiles.map(f => f.id),
    graphData: state.keywords.graphData,
    error: state.keywords.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generate: fileIds => {
      dispatch(getGraphData(fileIds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordGraphViewer)