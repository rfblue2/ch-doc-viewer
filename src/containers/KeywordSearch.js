import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl,
  Button,
  DropdownButton,
  MenuItem,
} from 'react-bootstrap'
import { getColData, getPermData } from '../actions'
import NumberSpinner from '../components/NumberSpinner'
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
    generate: PropTypes.func.isRequired,
    error: PropTypes.string,
    colData: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { query: '', window: 2, scoreType: 'mi' }
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

  getWindowSize() {
    return this.state.window
  }

  getScoreType() {
    return this.state.scoreType
  }

  // handle textfield enter keypress
  onKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      this.getPermutations()
    }
  }

  getPermutations() {
    this.props.dispatch(getPermData(
      this.props.fileIds,
      this.getKeywords(),
    ))
  }

  handleChange(e) {
    this.setState({ query: e.target.value })
  }

  handleSpinner(count) {
    this.setState({ window: count })
  }

  handleScoreSelect(type) {
    return () => {
      this.setState({scoreType: type})
    }
  }

  renderDropdown() {
    const scoreTypes = [
      'freq', 'mu', 'mi', 'mi2', 'll', 'z', 'dice', 'log-dice', 't', 'log-ratio', 'min-sensitivity',
    ]

    const typeToName = type => {
      switch (type) {
        case 'freq': return 'Frequency'
        case 'mu': return 'Mean'
        case 'mi': return 'Mutual Information'
        case 'mi2': return 'Mutual Information Squared'
        case 'll': return 'Log Likelihood'
        case 'z': return 'Z-score'
        case 'dice': return 'Dice'
        case 'log-dice': return 'Log Dice'
        case 't': return 't-distribution'
        case 'log-ratio': return 'Log Ratio'
        case 'min-sensitivity': return 'Minimum Sensitivity'
        default: return ''
      }
    }

    const renderDropdownItem = type =>
      <MenuItem key={type} eventKey={type} onSelect={this.handleScoreSelect(type).bind(this)}>
        {typeToName(type)}
      </MenuItem>

    return (
      <DropdownButton
        id={'score-type-dropdown'}
        title={typeToName(this.state.scoreType)}
      >
        {scoreTypes.map(renderDropdownItem)}
      </DropdownButton>
    )
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
            <Row>
              <Col xs={10}>
                <FormControl
                  type="text"
                  value={ this.state.query}
                  placeholder="Enter text"
                  onChange={ this.handleChange.bind(this) }
                  onKeyPress={ this.onKeyPress.bind(this) }
                />
              </Col>
              <Button onClick={this.getPermutations.bind(this)}>Search</Button>
            </Row>
          </FormGroup>
          <Row>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Window Size</ControlLabel>
                <NumberSpinner onChange={this.handleSpinner.bind(this)} min={2} max={10} />
              </FormGroup>
            </Col>
            <Col xs={6}>
              <FormGroup>
                <ControlLabel>Scoring Type</ControlLabel>
                <br/>
                { this.renderDropdown() }
              </FormGroup>
            </Col>
          </Row>
        </form>
        <KeywordPermViewer keywordPerms={keywordPerms} />
        <Button
          onClick={() => {
            generate(fileIds, this.getKeywords(), this.getWindowSize(), this.getScoreType())
          }} >
          Draw Keyword Collocation Graph
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
    generate: (fileIds, keywords, window, scoreType) => {
      dispatch(getColData(fileIds, window, keywords, scoreType))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeywordSearch)