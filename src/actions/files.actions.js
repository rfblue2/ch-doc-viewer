import { fileConsts } from '../constants'
import { filesService } from '../services'

const select = id => {
  const request = fileId => {
    return {
      type: fileConsts.SELECT_FILE_REQ,
      fileId,
    }
  }

  const success = (fileId, filename) => {
    return {
      type: fileConsts.SELECT_FILE_SUCC,
      fileId,
      filename,
    }
  }

  const failure = error => {
    return {
      type: fileConsts.SELECT_FILE_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(id))

    filesService.get(id).then(
      file => dispatch(success(file.id, file.filename)),
      error => dispatch(failure(error))
    )
  }

}

const get = id => {
  const request = fileId => {
    return {
      type: fileConsts.GET_FILE_REQ,
      fileId,
    }
  }

  const success = (fileId, filename, content) => {
    return {
      type: fileConsts.GET_FILE_SUCC,
      fileId,
      filename,
      content
    }
  }

  const failure = error => {
    return {
      type: fileConsts.GET_FILE_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(id))

    filesService.get(id).then(
      file => dispatch(success(file.id, file.filename, file.text)),
      error => dispatch(failure(error))
    )
  }

}

const getAll = () => {
  const request = () => {
    return {
      type: fileConsts.GETALL_FILES_REQ,
    }
  }

  const success = files => {
    return {
      type: fileConsts.GETALL_FILES_SUCC,
      files,
    }
  }

  const failure = error => {
    return {
      type: fileConsts.GETALL_FILE_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request())

    filesService.getAll().then(
      files => dispatch(success(files)),
      error => dispatch(failure(error))
    )
  }
}

const upload = file => {
  const request = file => {
    return {
      type: fileConsts.UPLOAD_FILE_REQ,
      file,
    }
  }

  const success = (filename, fileId) => {
    return {
      type: fileConsts.UPLOAD_FILE_SUCC,
      filename,
      fileId,
    }
  }

  const failure = error => {
    return {
      type: fileConsts.UPLOAD_FILE_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(file))

    filesService.upload(file).then(
      info => dispatch(success(info.filename, info.id)),
      error => dispatch(failure(error))
    )
  }
}

const remove = id => {
  const request = fileId => {
    return {
      type: fileConsts.DELETE_FILE_REQ,
      fileId,
    }
  }

  const success = fileId => {
    return {
      type: fileConsts.DELETE_FILE_SUCC,
      fileId,
    }
  }

  const failure = error => {
    return {
      type: fileConsts.DELETE_FILE_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(id))

    filesService.remove(id).then(
      file => dispatch(success(file.id)),
      error => dispatch(failure(error))
    )
  }
}

const unselect = id => {
  return {
    type: fileConsts.UNSELECT_FILE,
    fileId: id,
  }
}

export const displayFile = filename => {
  return {
    type: 'DISPLAY_FILE',
    filename
  }
}

export const fileActions = {
  select,
  get,
  getAll,
  upload,
  remove,
  unselect,
}