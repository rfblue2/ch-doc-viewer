import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { fileActions, folderActions } from '../actions'
import Directory from '../components/Directory'

/**
 * Container for the file list
 */
class VisibleDirectory extends Component {
  static propTypes = {
    files: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    folders: PropTypes.arrayOf(
      PropTypes.shape({
        folder_id: PropTypes.string.isRequired,
        folder_name: PropTypes.string.isRequired
      }).isRequired
    ).isRequired,
    onFileClick: PropTypes.func.isRequired,
    onFileRemove: PropTypes.func.isRequired,
    onFolderClick: PropTypes.func.isRequired,
    onFolderRemove: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    selectedFiles: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.string.isRequired,
        PropTypes.string.isRequired,
      )
    ).isRequired,
    selectedFolders: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.string.isRequired,
        PropTypes.string.isRequired,
      )
    ),
  }
   
  componentDidMount() {
    const { dispatch } = this.props  
    dispatch(folderActions.getAll())
    dispatch(fileActions.getAll())
  }

  render() {
    return (
      <div>
        <Directory { ...this.props } />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    files: state.files.fileList,
    folders: state.folders.folderList,
    selectedFiles: state.files.selectedFiles,
    selectedFolders: state.folders.selectedFolders,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFolderClick: (folderId, isSelected) => {
      if (isSelected) {
        dispatch(folderActions.unselect(folderId))
      } else {
        dispatch(folderActions.select(folderId))
      }
    },
    onFolderRemove: (folderId, isSelected) => e => {
      e.stopPropogation()
      if (isSelected) {
        dispatch(folderActions.unselect(folderId))
      }
      dispatch(folderActions.remove(folderId))
    },
    onFileClick: (fileId, isSelected) => {
      if (isSelected) {
        dispatch(fileActions.unselect(fileId))
      } else {
        dispatch(fileActions.select(fileId))
      }
    },
    onFileRemove: (fileId, isSelected) => e => {
      e.stopPropagation()
      if (isSelected) {
        dispatch(fileActions.unselect(fileId))
      }
      dispatch(fileActions.remove(fileId))
    },
    dispatch: dispatch,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleDirectory)