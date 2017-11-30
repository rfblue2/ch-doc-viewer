import PropTypes from 'prop-types'
import React from 'react'
import File from './File'
import './FileList.css'

/**
 * Represents a generic list of files, requiring action for clicking a
 * a file or removing it
 */
const FileList = ({ files, onFileClick, onRemoveClick, selectedFiles }) => (
  <div>
    {files.map((file, i) => (
      <File 
        key={i} 
        onFileClick={onFileClick}
        onRemoveClick={onRemoveClick}
        file={file}
        selected={selectedFiles.map(f => f.id).includes(file._id)}
      />
    ))}
  </div>
)

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onFileClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  selectedFiles: PropTypes.arrayOf(
    PropTypes.shape(
      PropTypes.string.isRequired,
      PropTypes.string.isRequired,
    )
  ).isRequired,
}

export default FileList