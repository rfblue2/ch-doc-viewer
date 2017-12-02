import PropTypes from 'prop-types'
import React from 'react'
import './File.css'

/**
 * Represents an individual file in the file list that you can click
 * to view the file (or remove it)
 */
const File = ({
                file,
                onFileClick,
                onRemoveClick,
                selected,
                parentFolderId
              }) => (
  <div 
    className={ 'file' +
      (selected ? ' selected' : '') +
      (parentFolderId !== 0 ? ' shifted' : '') }
    onClick={() => onFileClick(file._id, selected)} >
    <span
      className='remove'
      onClick={onRemoveClick(file._id, selected)} >
      &#10006;
    </span>
    <div className='filelink' >
      {file.filename}
    </div>
  </div>
)

File.propTypes = {
  selected: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  onFileClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  parentFolderId: PropTypes.any.isRequired,
}

export default File