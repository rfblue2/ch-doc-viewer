import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component }  from 'react'
import { getGraphData } from '../actions'
import {
  Button,
} from 'react-bootstrap'

/**
 * Toolbar to provide analysis options
 */
class Toolbar extends Component {
  static propTypes = {
    fileId: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
  }

  render() {
    const { fileId, dispatch } = this.props
    return (
      <div>
        <Button
          onClick={() => dispatch(getGraphData(fileId))}>
          Keyword Graph
        </Button>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileId: state.keywords.fileId,
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