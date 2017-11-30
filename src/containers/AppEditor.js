import { Editor } from 'draft-js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import SelectedFileList from '../components/SelectedFileList'
import { fileActions } from '../actions/files.actions'
import 'draft-js/dist/Draft.css'
import './AppEditor.css'

/**
 * The actual viewer containing all the content, currently using
 * Draftjs so to later support rich styling, esp. highlighting
 */
class AppEditor extends Component {
  static propTypes = {
    filename: PropTypes.string.isRequired,
    fileId: PropTypes.string.isRequired,
    editorState: PropTypes.object.isRequired,
    onSaveEditorState: PropTypes.func.isRequired,
    selectedFiles: PropTypes.arrayOf(
      PropTypes.shape(
        PropTypes.string.isRequired,
        PropTypes.string.isRequired,
      )
    ).isRequired,
    onSelectFile: PropTypes.func.isRequired,
  }

  render() {
    const {
      editorState,
      onSaveEditorState,
      filename,
      fileId,
      selectedFiles,
      onSelectFile, // select file from selected files to view
    } = this.props
    return (
      <div>
        <SelectedFileList
          files={selectedFiles}
          onSelectFile={onSelectFile}
          viewedFileId={fileId}
        />
        <h2>{filename}</h2>
        <Editor
          readOnly={true}
          editorState={editorState}
          onChange={onSaveEditorState}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    editorState: state.editor.editorState,
    filename: state.editor.filename,
    selectedFiles: state.files.selectedFiles,
    fileId: state.editor.visibleFileId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveEditorState: (editorState) => {
      dispatch({
        type: 'UPDATE_EDITOR_STATE',
        editorState: editorState,
      })
    },
    onSelectFile: (fileId) => {
      dispatch(fileActions.get(fileId))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppEditor)