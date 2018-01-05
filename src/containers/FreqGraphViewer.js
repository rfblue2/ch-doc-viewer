import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getKeywordFreqData } from '../actions'
import {
  Button,
  ControlLabel,
  Checkbox,
} from 'react-bootstrap'
import NumberSpinner from '../components/NumberSpinner'
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

  constructor(props) {
    super(props)
    this.state = { ngram: 1, limit: 10, normalize: false }
  }

  handleNGramSpinner(count) {
    this.setState({ ngram: count })
  }

  handleLimitSpinner(count) {
    this.setState({ limit: count })
  }

  handleNormalize(e) {
    this.setState({ normalize: e.target.checked })
  }

  getNGram() {
    return this.state.ngram
  }

  getLimit() {
    return this.state.limit
  }

  getNormalize() {
    return this.state.normalize
  }

  render() {
    const { generate, fileIds } = this.props

    return (
      <div>
        <Button
          onClick={() => generate(fileIds, this.getNGram(), this.getLimit(), this.getNormalize())}>
          Frequency Graph
        </Button>
        <br/>
        <ControlLabel>N-gram: </ControlLabel>
        <NumberSpinner min={1} max={4} onChange={this.handleNGramSpinner.bind(this)}/>
        <ControlLabel>Limit: </ControlLabel>
        <NumberSpinner min={10} max={30} onChange={this.handleLimitSpinner.bind(this)}/>
        <Checkbox onChange={this.handleNormalize.bind(this)}>Normalize</Checkbox>
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
    generate: (fileIds, ngram, limit, normalize) => {
      console.log(normalize)
      dispatch(getKeywordFreqData(fileIds, ngram, limit, normalize))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FreqGraphViewer)
