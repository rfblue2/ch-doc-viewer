import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getKeywordFreqData } from '../actions'
import {
  Button,
} from 'react-bootstrap'
import FreqGraph from '../components/FreqGraph'

/**
 * Responsible for rendering keyword frequency bar chart
 */
class FreqGraphViewer extends Component {
  static propTypes = {
    freqData: PropTypes.object,
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
          Frequency Graph
        </Button>
        <br/>
        <div className='row'>
          <FreqGraph { ...this.props }/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileIds: state.files.selectedFiles.map(f => f.id),
    freqData: state.keywords.freqData,
    error: state.keywords.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generate: fileIds => {
      dispatch(getKeywordFreqData(fileIds, 1, 10))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreqGraphViewer)
