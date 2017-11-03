import { Editor } from 'draft-js'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import 'draft-js/dist/Draft.css'
import './AppEditor.css'

/**
 * The actual viewer containing all the content, currently using
 * Draftjs so to later support rich styling, esp. highlighting
 */
class AppEditor extends Component {
  static propTypes = {
    filename: PropTypes.string.isRequired,
    editorState: PropTypes.object.isRequired,
    onSaveEditorState: PropTypes.func.isRequired,
  }

  render() {
    const { editorState, onSaveEditorState, filename } = this.props
    return (
      <div>
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSaveEditorState: (editorState) => {
      dispatch({
        type: 'UPDATE_EDITOR_STATE',
        editorState: editorState,
      })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppEditor)