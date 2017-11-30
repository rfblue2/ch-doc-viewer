import PropTypes from 'prop-types'
import React from 'react'
import KeywordPerm from './KeywordPerm'

const renderKeywordPerms = perms => 
  perms.map(p => <KeywordPerm {...p} key={p.before} />)


/**
 * Shows the keywords in context found
 */
const KeywordPermViewer = ({ keywordPerms }) => (
  <ul>
    { renderKeywordPerms(keywordPerms) }
  </ul>
)

KeywordPermViewer.propTypes = {
    keywordPerms: PropTypes.arrayOf(
      PropTypes.shape({
        before: PropTypes.string.isRequired,
        keyword: PropTypes.string.isRequired,
        after: PropTypes.string.isRequired,
        filename: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
}

export default KeywordPermViewer