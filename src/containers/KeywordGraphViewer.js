import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getGraphData } from '../actions'
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
    return (
      <KeywordGraph { ...this.props }/>
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
      console.log('clicked')
      dispatch(getGraphData(fileIds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordGraphViewer)