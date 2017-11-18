import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component }  from 'react'
import { fetchKeywordGraphData } from '../actions/keywords'
import {
  Button,
} from 'react-bootstrap'

/**
 * Toolbar to provide analysis options
 */
class Toolbar extends Component {
  static propTypes = {
    fileid: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { fileid, dispatch } = this.props
    return (
      <div>
        <Button
          onClick={() => dispatch(fetchKeywordGraphData(fileid))}>
          Keyword Graph
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileid: state.keywords.fileid,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Toolbar)