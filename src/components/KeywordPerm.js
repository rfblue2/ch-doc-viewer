import PropTypes from 'prop-types'
import React from 'react'

/**
 * Represents a single keyword permutation
 */
const KeywordPerm = ({ before, keyword, after, filename }) => (
  <li>
    {filename}: { before } <b>{ keyword }</b> { after }
  </li>
)

KeywordPerm.propTypes = {
  'before': PropTypes.string.isRequired,
  'after': PropTypes.string.isRequired,
  'keyword': PropTypes.string.isRequired,
  'filename': PropTypes.string.isRequired,
}

export default KeywordPerm