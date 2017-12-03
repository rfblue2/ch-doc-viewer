import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { folderActions } from '../actions/folders.actions'
import {
  Button
} from 'react-bootstrap'

/**
 * Container for button to add a folder
 */
class AddFolder extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  addFolder() {
    const name = prompt('Folder Name:')
    if (name) {
      this.props.dispatch(folderActions.add(name))
    }
  }

  render() {
    return (
      <div>
        <Button onClick={this.addFolder.bind(this)} >
          New Folder
        </Button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
  }
}

export default connect(
  mapDispatchToProps
)(AddFolder)