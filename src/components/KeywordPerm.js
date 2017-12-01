import PropTypes from 'prop-types'
import React from 'react'
import './KeywordPerm.css'

/**
 * Represents a single keyword permutation
 */
const KeywordPerm = ({ before, keyword, after, filename }) => (
  <li class='keyword_perm row'>
    <div class='filename col-sm-3'>{filename}:</div>
    <div class='context col-sm-6'>
      <span class='before'>{ before }</span>
      <span class='keyword'><b>{ keyword }</b></span>
      <span class='after'>{ after }</span>
    </div>
  </li>
)

KeywordPerm.propTypes = {
  'before': PropTypes.string.isRequired,
  'after': PropTypes.string.isRequired,
  'keyword': PropTypes.string.isRequired,
  'filename': PropTypes.string.isRequired,
}

export default KeywordPerm