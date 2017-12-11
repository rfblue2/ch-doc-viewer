import PropTypes from 'prop-types'
import React from 'react'

/**
 * Represents a single keyword
 */
const Keyword = ({ word, rank }) => (
  <li className='keyword_pagerank row'>
    <div className='filename col-sm-6'>{ word }</div>
    <div className='context col-sm-6'>{ rank }</div>
  </li>
)

Keyword.propTypes = {
  'word': PropTypes.string.isRequired,
  'rank': PropTypes.string.isRequired,
}

export default Keyword