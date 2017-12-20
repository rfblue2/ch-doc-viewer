import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './Dendrogram.css'

/**
 * Displays a dendrogram of selected files
 */
class Dendrogram extends Component {
  static propTypes = {
    dendrogramData: PropTypes.object,
    error: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
    } else if (nextProps.dendrogramData) {
      Dendrogram.clearGraph()
      Dendrogram.renderGraph(nextProps.dendrogramData)
    } else {
      Dendrogram.clearGraph()
    }
  }

  static clearGraph() {
    d3.selectAll(`.dendrogram > *`).remove() // clear svg
  }

  static renderGraph(data) {
    const svg = d3.select('.dendrogram'),
      width = +svg.attr('width'),
      height = +svg.attr('height')

    const root = d3.hierarchy(data)

    const cluster = d3.cluster()
      .size([height, width - 160])

    const nodes = cluster(root).leaves(),
      links = root.descendants().slice(1)

    svg.append('g')
      .selectAll('cluster-link')
      .data(links)
      .enter().append('path')
      .attr('class', 'cluster-link')
      .attr('d', d =>
        `M${d.y},${d.x}C${(d.parent.y + d.y) / 2},${d.x} \
        ${(d.parent.y + d.y) / 2},${d.parent.x} \
        ${d.parent.y},${d.parent.x}`
      )

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter().append('g')
      .attr('class', 'cluster-node')
      .attr('transform', d => `translate(${d.y},${d.x})`)

    node.append('circle')
      .attr('r', 4.5)

    node.append('text')
      .attr('dx', d => d.children ? -8 : 8 )
      .attr('dy', 3)
      .style('text-anchor', d => d.children ? 'end' : 'start' )
      .style('font-size', 24)
      .text(d => d.data.name)

  }

  render() {
    return (
      <svg
        className='dendrogram'
        ref={node => this.node = node}
        width={800}
        height={500}
      />
    )
  }

}

export default Dendrogram