import PropTypes from 'prop-types'
import React from 'react'
import './Folder.css'

/**
 * Represents a folder in the file directory
 */
const Folder = ({
                  folder,
                  onClick,
                  onRemove,
                  onExpand,
                  selected,
                }) => (
  <div
    className={ 'folder' + (selected ? ' selected' : '')}
    onClick={() => onClick(folder._id, selected)}>
    <span
      className='expand'
      onClick={onExpand(folder._id, folder.expanded)}
    >
      { folder.expanded ? <span>&#8863;</span> : <span>&#8862;</span> }
    </span>
    <div className='folderlink' >
      { folder.folder_name }
    </div>
    <span
      className='remove'
      onClick={onRemove(folder._id, selected)}>
      &#10006;
    </span>
  </div>
)

Folder.propTypes = {
  selected: PropTypes.bool.isRequired,
  folder: PropTypes.shape({
    folder_name: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onExpand: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}

export default Folder