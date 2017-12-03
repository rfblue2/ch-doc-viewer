import PropTypes from 'prop-types'
import React from 'react'
import { DropTarget } from 'react-dnd'
import { ItemTypes } from '../constants'
import './Folder.css'

const folderTarget = {
  drop(props, monitor) {
    props.handleReceivedFile(props.folder._id, monitor.getItem())
  }
}

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

/**
 * Represents a folder in the file directory
 */
const Folder = ({
                  folder,
                  onClick,
                  onRemove,
                  onExpand,
                  selected,
                  connectDropTarget,
                  isOver,
                }) =>
connectDropTarget(
  <div
    className={ 'folder' +
      (selected ? ' selected' : '') +
      (isOver ? ' over' : '')
    }
    onClick={() => onClick(folder._id, selected)}>
    <span
      className='expand'
      onClick={onExpand(folder._id, folder.expanded)}
    >
      { folder.expanded ? <span>▼</span> : <span>▶</span> }
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
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  handleReceivedFile: PropTypes.func.isRequired,
}

export default DropTarget(ItemTypes.FILE, folderTarget, collect)(Folder)