/* global process */
// Global Constants

export * from './files.constants'
export * from './folders.constants'
export * from './keywords.constants'
export * from './clusters.constants'

const DEV_URL = 'http://127.0.0.1:5000'
const PROD_URL = 'https://ch-doc-viewer.herokuapp.com'
const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

export const BASE_URL = DEV ? DEV_URL : PROD_URL
export const FILE_URL = BASE_URL + '/files'
export const FOLDER_URL = BASE_URL + '/folders'
export const KEYWORDGRAPH_URL = BASE_URL + '/keywordgraph'
export const KEYWORDPERMS_URL = BASE_URL + '/keywordperm'
export const KEYWORDS_URL = BASE_URL + '/keywords'
export const DENDROGRAM_URL = BASE_URL + '/dendrogram'

// React DnD draggable item types
export const ItemTypes = {
  FILE: 'file',
}