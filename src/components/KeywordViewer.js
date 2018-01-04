import PropTypes from 'prop-types'
import React from 'react'
import Keyword from './Keyword'
import './KeywordViewer.css'

/**
 * Shows keywords found
 */
const KeywordViewer = ({ keywordData }) => (
  <ol>
    { keywordData.map(k => <Keyword
        key={k.word}
        word={ k.word}
        rank={k.rank} />
      )}
  </ol>
)

KeywordViewer.propTypes = {
  keywordData: PropTypes.arrayOf(
    PropTypes.shape({
      word: PropTypes.string.isRequired,
      rank: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
}

export default KeywordViewer