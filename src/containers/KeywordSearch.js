import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { 
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
} from 'react-bootstrap'
import { getColData, getPermData } from '../actions'
import KeywordPermViewer from '../components/KeywordPermViewer'
import KeywordGraph2 from '../components/KeywordGraph2'

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
    colData: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { query: '' }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
      return
    }
  }

  // returns the keywords from the user query
  getKeywords() {
    return this.state.query
      .split(/[，,]+/)
      .map(s => s.trim())
      .filter(Boolean)
  }

  // handle textfield enter keypress
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
    const { keywordPerms, generate, fileIds, colData } = this.props
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
          Keyword Collocation Graph
        </Button>
        <br/>
        <KeywordGraph2 colData={colData} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    keywordPerms: state.keywords.permData,
    fileIds: state.files.selectedFiles.map(f => f.id),
    colData: state.keywords.colData,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    generate: (fileIds, keywords) => {
      dispatch(getColData(fileIds, 2, keywords, 'mi'))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSearch)