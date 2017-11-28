import { FILE_URL } from '../constants'
import { fileConsts } from '../constants'

// TODO move fetches into middleware and instead pass API params

export const fetchFile = id => dispatch => {
    dispatch(downloadFile())
    return fetch(FILE_URL + '/' + id,
        {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (response.ok) {
                response.json().then(json =>
                    dispatch(downloadFileSuccess(json.id, json.filename, json.text))
                )
            }
        })
        .catch(err => dispatch(downloadFileError(err)))
}

export const downloadFile = () => {
    return {
        type: fileConsts.DOWNLOAD_FILE_REQ,
    }
}

export const downloadFileSuccess = (id, filename, content) => {
    return {
        type: fileConsts.DOWNLOAD_FILE_SUCC,
        fileid: id,
        filename,
        content
    }
}

export const downloadFileError = error => {
    return {
        type: fileConsts.DOWNLOAD_FILE_ERR,
        error
    }
}

export const fetchFiles = () => dispatch => {
    dispatch(loadFiles())
    return fetch(FILE_URL,
        {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            if (response.ok)
                response.json().then(json =>
                    dispatch(loadFilesSuccess(json))
                )
        })
        .catch(err => {
            dispatch(loadFilesError(err))
        })
}

export const loadFiles = () => {
    return {
        type: fileConsts.LOAD_FILES_REQ,
    }
}

export const loadFilesSuccess = files => {
    return {
        type: fileConsts.LOAD_FILES_SUCC,
        files
    }
}

export const loadFilesError = error => {
    return {
        type: fileConsts.UPLOAD_FILE_ERR,
        error
    }
}

export const uploadFile = file => dispatch => {
    var form = new FormData()
    form.append("file", file)

    fetch(FILE_URL, {
        method: 'POST',
        mode: 'cors',
        body: form
    }).then(res => {
        if (res.ok) {
            res.json().then(json => dispatch(uploadFileSuccess(json.filename, json.id)))
        } else throw res.status
    }).catch(
        err => dispatch(uploadFileError(err))
    )
}

export const uploadFileRequest = filename => {
    return {
        type: fileConsts.UPLOAD_FILE_REQ,
        filename
    }
}

export const uploadFileSuccess = (filename, fileid) => {
    return {
        type: fileConsts.UPLOAD_FILE_SUCC,
        filename,
        fileid,
    }
}

export const uploadFileError = error => {
    return {
        type: fileConsts.UPLOAD_FILE_ERR,
        error
    }
}

export const displayFile = filename => {
    return {
        type: 'DISPLAY_FILE',
        filename
    }
}

export const deleteFile = id => dispatch => {
    fetch(FILE_URL + '/' + id, {
        method: 'DELETE',
        mode: 'cors',
    }).then(res => {
        if (res.ok) {
            res.json().then(json => dispatch(deleteFileSuccess(json.id)))
        } else throw res.status
    }).catch(
        err => dispatch(deleteFileError(err))
    )
}

export const deleteFileRequest = fileid => {
    return {
        type: fileConsts.DELETE_FILE_REQ,
        fileid
    }
}

export const deleteFileSuccess = fileid => {
    return {
        type: fileConsts.DELETE_FILE_SUCC,
        fileid,
    }
}

export const deleteFileError = error => {
    return {
        type: fileConsts.DELETE_FILE_ERR,
        error
    }
}