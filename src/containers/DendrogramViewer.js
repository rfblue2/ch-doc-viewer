import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getDendrogramData } from '../actions'
import {
  Button,
} from 'react-bootstrap'
import Dendrogram from '../components/Dendrogram'

/**
 * Responsible for rendering the dendrogram to cluster selected texts
 */
class DendrogramViewer extends Component {
  static propTypes = {
    dendrogramData: PropTypes.object,
    error: PropTypes.object,
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    generate: PropTypes.func.isRequired,
  }

  render() {
    const { generate, fileIds, dendrogramData, error } = this.props
    return (
      <div>
        <Button onClick={() => generate(fileIds)}>
          Dendrogram
        </Button>
        <br/>
        <Dendrogram dendrogramData={dendrogramData} error={error} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    fileIds: state.files.selectedFiles.map(f => f.id),
    dendrogramData: state.clusters.dendrogramData,
    error: state.clusters.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    generate: fileIds => {
      dispatch(getDendrogramData(fileIds))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DendrogramViewer)