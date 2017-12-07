import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { 
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap'
import { getGraphData, getPermData } from '../actions'
import KeywordPermViewer from '../components/KeywordPermViewer'
import KeywordGraph from '../components/KeywordGraph'

/**
 * Enables keyword search
 */
class KeywordSearch extends Component {
  static propTypes = {
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    keywordPerms: PropTypes.arrayOf(
      PropTypes.shape({
        before: PropTypes.string.isRequired,
        keyword: PropTypes.string.isRequired,
        after: PropTypes.string.isRequired,
      }).isRequired
    ),
    error: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { query: '' }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
      return
    }
  }

  getKeywords() {
    return this.state.query
      .split(/[，,]+/)
      .map(s => s.trim())
      .filter(Boolean)
  }

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.props.dispatch(getPermData(
        this.props.fileIds,
        this.getKeywords(),
      ))
    }
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  render() {
    const { keywordPerms, generate, fileIds, graphData } = this.props
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Keywords (comma separated):</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.query}
              placeholder="Enter text"
              onChange={ this.handleChange.bind(this) }
              onKeyPress={ this.onKeyPress.bind(this) }
            />
          </FormGroup>
        </form>
        <KeywordPermViewer keywordPerms={keywordPerms} />
        <Button
          onClick={() => {
            generate(fileIds, this.getKeywords())
          }} >
          Keyword SubGraph
        </Button>
        <br/>
        <KeywordGraph graphData={graphData} handle='search'/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    keywordPerms: state.keywords.permData,
    fileIds: state.files.selectedFiles.map(f => f.id),
    graphData: state.keywords.graphData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    generate: (fileIds, keywords) => {
      dispatch(getGraphData(fileIds, 2, keywords, 5))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSearch)