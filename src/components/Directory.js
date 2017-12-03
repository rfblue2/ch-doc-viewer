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
  selectedFiles,
  handleUndroppedFile,
) =>
  files.filter(f => f.folder_id === folderId)
    .map((file, i) => (
      <File
        key={i}
        onClick={onFileClick}
        onRemove={onFileRemove}
        handleUndroppedFile={handleUndroppedFile}
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
                     handleReceivedFile,
                     handleUndroppedFile,
                     onFolderExpand,
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
            onExpand={onFolderExpand}
            handleReceivedFile={handleReceivedFile}
            folder={folder}
            selected={selectedFolders.map(f => f.id).includes(folder._id)}
          />
          { // only show files if folder is expanded
            folder.expanded ?
            renderFilesInFolder(
              files,
              folder._id,
              onFileClick,
              onFileRemove,
              selectedFiles,
              handleUndroppedFile,
            ) : null
          }
        </div>
      ))
    }
    { // files in root directory
      renderFilesInFolder(
        files,
        '0',
        onFileClick,
        onFileRemove,
        selectedFiles,
        () => null
      )
    }
  </div>
)

Directory.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      folder_id: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  folders: PropTypes.arrayOf(
    PropTypes.shape({
      expanded: PropTypes.bool.isRequired,
      folder_name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    }).isRequired
  ).isRequired,
  onFileClick: PropTypes.func.isRequired,
  onFileRemove: PropTypes.func.isRequired,
  onFolderClick: PropTypes.func.isRequired,
  onFolderRemove: PropTypes.func.isRequired,
  onFolderExpand: PropTypes.func.isRequired,
  handleReceivedFile: PropTypes.func.isRequired,
  handleUndroppedFile: PropTypes.func.isRequired,
  selectedFiles: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      filename: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedFolders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Directory