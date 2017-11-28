import { connect } from 'react-redux'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { fileActions } from '../actions'
import './AddFile.css'

/**
 * Container for the dropzone for adding files
 */
class AddFile extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  }

  onDrop(files) {
    files.forEach(f => this.props.dispatch(fileActions.upload(f)))
  }

  render() {
    return (
      <div>
        <Dropzone 
          className='dropzone'
          onDrop={this.onDrop.bind(this)}
          accept='text/plain' 
        >
          <p>Click to upload files or drag and drop them here</p>
        </Dropzone>
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
)(AddFile)
