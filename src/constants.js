/* global process */
// Global Constants

const DEV_URL = 'http://127.0.0.1:5000'
const PROD_URL = 'https://ch-doc-viewer.herokuapp.com/'
const DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
console.log(process.env.NODE_ENV)
export const BASE_URL = DEV ? DEV_URL : PROD_URL 
export const FILE_URL = BASE_URL + '/files'
export const KEYWORDGRAPH_URL = BASE_URL + '/keywordgraph'