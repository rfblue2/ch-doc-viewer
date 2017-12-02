import PropTypes from 'prop-types'
import React from 'react'
import './Folder.css'

/**
 * Represents a folder in the file directory
 */
const Folder = ({ folder, onClick, onRemove, selected }) => (
  <div
    className={ 'folder' + (selected ? ' selected' : '')}
    onClick={() => onClick(folder._id, selected)}>
    <span
      className='remove'
      onClick={onRemove(folder._id, selected)}>
      &#10006;
    </span>
    <div className='folderlink' >
      { folder.folder_name }
    </div>
  </div>
)

Folder.propTypes = {
  selected: PropTypes.bool.isRequired,
  folder: PropTypes.shape({
    folder_name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Folder