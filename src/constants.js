/* global __DEV__ */
// Global Constants

const DEV_URL = 'http://127.0.0.1:5000'
const PROD_URL = 'https://ch-doc-viewer.herokuapp.com/'

export const BASE_URL = (__DEV__ == null) ? PROD_URL : DEV_URL 
export const FILE_URL = BASE_URL + '/files'
export const KEYWORDGRAPH_URL = BASE_URL + '/keywordgraph'