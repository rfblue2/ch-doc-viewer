import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  ButtonGroup,
} from 'react-bootstrap'

/**
 * Pills of selected files to analyze
 */
const SelectedFileList = ({files, onSelectFile, viewedFileId}) => (
  <ButtonGroup>
    {files.map(f =>
      <Button
        key={f.id}
        onClick={() => onSelectFile(f.id)}
        disabled={viewedFileId === f.id}>
        {f.filename}
      </Button>)
    }
  </ButtonGroup>
)

SelectedFileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onSelectFile: PropTypes.func.isRequired,
  viewedFileId: PropTypes.string,
}

export default SelectedFileList

