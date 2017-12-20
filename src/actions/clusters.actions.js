import { clustersService } from '../services'
import { clustersConsts } from '../constants'

export const getDendrogramData = fileIds => {
  const request = fileIds => {
    return {
      type: clustersConsts.LOAD_DENDROGRAM_REQ,
      fileIds,
    }
  }
  const success = dendrogramData => {
    return {
      type: clustersConsts.LOAD_DENDROGRAM_SUCC,
      dendrogramData,
    }
  }
  const failure = error => {
    return {
      type: clustersConsts.LOAD_DENDROGRAM_ERR,
      error,
    }
  }

  return dispatch => {
    dispatch(request(fileIds))

    if (!fileIds || fileIds.length <= 0) {
      dispatch(failure('Error: No File Selected'))
      return
    }

    clustersService.getDendrogramData(fileIds).then(
      data => dispatch(success(data)),
      err => dispatch(failure(err))
    )
  }
}