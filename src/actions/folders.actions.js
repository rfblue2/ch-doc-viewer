import { folderConsts } from '../constants'
import { foldersService } from '../services'

const getAll = () => {
  const request = () => {
    return {
      type: folderConsts.GETALL_FOLDERS_REQ,
    }
  }

  const success = folders => {
    return {
      type: folderConsts.GETALL_FOLDERS_SUCC,
      folders,
    }
  }

  const failure = error => {
    return {
      type: folderConsts.GETALL_FOLDERS_ERR,
      error
    }
  }

  return dispatch => {
    dispatch(request())

    foldersService.getAll().then(
      folders => dispatch(success(folders)),
      error => dispatch(failure(error))
    )
  }
}

const add = foldername => {
  const request = foldername => {
    return {
      type: folderConsts.ADD_FOLDER_REQ,
      foldername,
    }
  }

  const success = (foldername, folderId) => {
    return {
      type: folderConsts.ADD_FOLDER_SUCC,
      foldername,
      folderId,
    }
  }

  const failure = error => {
    return {
      type: folderConsts.ADD_FOLDER_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(foldername))

    foldersService.add(foldername).then(
      info => dispatch(success(info.folder_name, info._id)),
      error => dispatch(failure(error))
    )
  }
}

const select = folderId => {
  return {
    type: folderConsts.SELECT_FOLDER,
    folderId,
  }
}

const unselect = folderId => {
  return {
    type: folderConsts.UNSELECT_FOLDER,
    folderId,
  }
}

const expand = folderId => {
  return {
    type: folderConsts.EXPAND_FOLDER,
    folderId,
  }
}

const collapse = folderId => {
  return {
    type: folderConsts.COLLAPSE_FOLDER,
    folderId,
  }
}

const remove = id => {
  const request = folderId => {
    return {
      type: folderConsts.DELETE_FOLDER_REQ,
      folderId,
    }
  }

  const success = folderId => {
    return {
      type: folderConsts.DELETE_FOLDER_SUCC,
      folderId,
    }
  }

  const failure = error => {
    return {
      type: folderConsts.DELETE_FOLDER_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(id))

    foldersService.remove(id).then(
      folder => dispatch(success(folder.folder_id)),
      error => dispatch(failure(error))
    )
  }
}

export const folderActions = {
  getAll,
  add,
  select,
  unselect,
  expand,
  collapse,
  remove,
}
