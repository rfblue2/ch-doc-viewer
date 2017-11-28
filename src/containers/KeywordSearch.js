import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { 
  FormGroup,
  ControlLabel,
  FormControl,
} from 'react-bootstrap'
import { fetchKeywordPerms } from '../actions'
import KeywordPermViewer from '../components/KeywordPermViewer'

/**
 * Enables keyword search
 */
class KeywordSearch extends Component {
  static propTypes = {
    fileid: PropTypes.string,
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

  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.props.dispatch(fetchKeywordPerms(
        this.props.fileid, 
        this.state.query.split(/[，,]+/).map(s => s.trim())
      ))
    }
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  render() {
    const { keywordPerms } = this.props
    return (
      <div>
        <form>
          <FormGroup
            controlId="formBasicText"
          >
            <ControlLabel>Keywords:</ControlLabel>
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
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    keywordPerms: state.keywords.permData,
    fileid: state.keywords.fileid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSearch)