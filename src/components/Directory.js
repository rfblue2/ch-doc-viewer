import PropTypes from 'prop-types'
import React from 'react'
import File from './File'
import Folder from './Folder'
import './Directory.css'

const renderFilesInFolder = (
  files,
  folderId,
  onFileClick,
  onFileRemove,
  selectedFiles
) =>
  files.filter(f => f.folder_id === folderId)
    .map((file, i) => (
      <File
        key={i}
        onFileClick={onFileClick}
        onRemoveClick={onFileRemove}
        file={file}
        selected={selectedFiles.map(f => f.id).includes(file._id)}
        parentFolderId={file.folder_id}
      />
    ))

/**
 * Represents a generic list of files, requiring action for clicking a
 * a file or removing it
 */
const Directory = ({
                     files,
                     folders,
                     onFileClick,
                     onFileRemove,
                     onFolderClick,
                     onFolderRemove,
                     selectedFiles,
                     selectedFolders,
                   }) => (
  <div>
    {
      folders.map((folder, i) => (
        <div key={i} >
          <Folder
            onClick={onFolderClick}
            onRemove={onFolderRemove}
            folder={folder}
            selected={selectedFolders.map(f => f.id).includes(folder.folder_id)}
          />
          { renderFilesInFolder(files, folder._id, onFileClick, onFileRemove, selectedFiles)}
        </div>
      ))
    }
    {
      renderFilesInFolder(files, 0, onFileClick, onFileRemove, selectedFiles)
    }
  </div>
)

Directory.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      folder_name: PropTypes.string.isRequired,
      folder_id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onFileClick: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func.isRequired,
  onFolderRemove: PropTypes.func.isRequired,
  selectedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFolders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      foldername: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Directory