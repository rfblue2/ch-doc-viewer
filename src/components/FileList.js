import PropTypes from 'prop-types'
import React from 'react'
import File from './File'
import './FileList.css'

/**
 * Represents a generic list of files, requiring action for clicking a
 * a file or removing it
 */
const FileList = ({ files, onFileClick, onRemoveClick, selectedId }) => (
  <div>
    {files.map((file, i) => (
      <File 
        key={i} 
        onFileClick={() => onFileClick(file._id)} 
        onRemoveClick={onRemoveClick(file._id)}
        file={file}
        selected={file._id === selectedId}
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
  selectedId: PropTypes.string.isRequired,
}

export default FileList