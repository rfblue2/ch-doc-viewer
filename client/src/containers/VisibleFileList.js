import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { deleteFile, fetchFile, fetchFiles } from '../actions'
import FileList from '../components/FileList'

/**
 * Container for the file list
 */
class VisibleFileList extends Component {
  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onFileClick: PropTypes.func.isRequired,
    onRemoveClick: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired
  }
   
  componentDidMount() {
    const { dispatch } = this.props  
    dispatch(fetchFiles())
  }

  render() {
    const { files, onFileClick, onRemoveClick } = this.props
    return (
      <div>
        <FileList 
          files={files} 
          onFileClick={onFileClick}
          onRemoveClick={onRemoveClick} /> 
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    files: state.files
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFileClick: fileid => {
      dispatch(fetchFile(fileid))
    },
    onRemoveClick: fileid => e => {
      e.stopPropagation()
      dispatch(deleteFile(fileid))
    },
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleFileList)
