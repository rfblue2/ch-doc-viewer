import PropTypes from 'prop-types'
import React from 'react'
import { DragSource } from 'react-dnd'
import { ItemTypes } from '../constants'
import './File.css'

const fileSource = {
  beginDrag(props) {
    return {
      fileId: props.file._id,
    }
  },
  endDrag(props, monitor) {
    if (!monitor.didDrop()) {
      props.handleUndroppedFile(props.file._id)
    }
  },
}

const collect = connect => {
  return {
    connectDragSource: connect.dragSource(),
  }
}

/**
 * Represents an individual file in the file list that you can click
 * to view the file (or remove it)
 */
const File = ({
                file,
                onClick,
                onRemove,
                selected,
                parentFolderId,
                connectDragSource,
              }) =>
connectDragSource(
  <div
    className={ 'file' +
      (selected ? ' selected' : '') +
      (parentFolderId !== '0' ? ' shifted' : '') }
    onClick={() => onClick(file._id, selected)} >
    <div className='filelink' >
      {file.filename}
    </div>
    <span
      className='remove'
      onClick={onRemove(file._id, selected)} >
      &#10006;
    </span>
  </div>
)

File.propTypes = {
  selected: PropTypes.bool.isRequired,
  file: PropTypes.shape({
    filename: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  parentFolderId: PropTypes.string.isRequired,
  connectDragSource: PropTypes.func.isRequired,
  handleUndroppedFile: PropTypes.func.isRequired,
}

export default DragSource(ItemTypes.FILE, fileSource, collect)(File)