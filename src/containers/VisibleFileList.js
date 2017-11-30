import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { fileActions } from '../actions'
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
    dispatch: PropTypes.func.isRequired,
    selectedFiles: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.string.isRequired,
        PropTypes.string.isRequired,
      )
    ).isRequired,
  }
   
  componentDidMount() {
    const { dispatch } = this.props  
    dispatch(fileActions.getAll())
  }

  render() {
    const { files, onFileClick, onRemoveClick, selectedFiles } = this.props
    return (
      <div>
        <FileList 
          files={files} 
          onFileClick={onFileClick}
          onRemoveClick={onRemoveClick}
          selectedFiles={selectedFiles}/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    files: state.files.fileList,
    selectedFiles: state.files.selectedFiles,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFileClick: (fileid, isSelected) => {
      if (isSelected) {
        dispatch(fileActions.unselect(fileid))
      } else {
        dispatch(fileActions.select(fileid))
      }
    },
    onRemoveClick: (fileid, isSelected) => e => {
      e.stopPropagation()
      if (isSelected) {
        dispatch(fileActions.unselect(fileid))
      }
      dispatch(fileActions.remove(fileid))
    },
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VisibleFileList)
