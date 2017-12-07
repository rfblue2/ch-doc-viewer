import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
} from 'react-bootstrap'
import './KeywordGraph.css'

/**
 * Displays a keyword collocation graph using d3
 */
class KeywordGraph extends Component {

  static propTypes = {
    graphData: PropTypes.object,
    error: PropTypes.object,
    generate: PropTypes.func.isRequired,
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
    } else if (nextProps.graphData) {
      KeywordGraph.clearGraph()
      this.renderGraph(nextProps.graphData)
    } else {
      KeywordGraph.clearGraph()
    }
  }

  static clearGraph() {
    d3.selectAll('svg > *').remove() // clear svg
  }

  renderGraph(graph) {
    const svg = d3.select('svg'),
      width = +svg.attr('width'),
      height = +svg.attr('height')

    const maxDeg = Math.max.apply(Math, graph.nodes.map(n => n.degree))

    const color = t => d3.interpolateWarm(t)

    const radius = 2

    const simulation = d3.forceSimulation()
      .force('link', d3.forceLink().id(d => d.id))
      .force('charge', d3.forceManyBody().strength(-5))
      .force('center', d3.forceCenter(width / 2, height / 2))

    const link = svg.append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(graph.links)
      .enter().append('line')
      .attr('stroke-width', d => Math.sqrt(d.value) )

    const dragstarted = d => {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    const dragged = d=> {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    const dragended = d => {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    const node = svg.append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(graph.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended))

    node.append('circle')
      .attr('r', d => radius * d.degree)
      .attr('fill', d => color(1 - d.degree / maxDeg))

    node.append('text')
      .text(d => d.id)
      .style('font-size', d => (d.degree * 2 + 7) + 'px')

    const ticked = () => {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y)

      //constrains the nodes to be within a box
      node
        .attr('transform',
          d => {
            let dx = Math.max(radius, Math.min(width - radius, d.x))
            let dy = Math.max(radius, Math.min(height - radius, d.y))
            return `translate(${dx},${dy})`
          }
        )
    }

    simulation
      .nodes(graph.nodes)
      .on('tick', ticked)

    simulation.force('link')
      .links(graph.links)
  }

  render() {
    const { generate, fileIds } = this.props
    return (
      <div>
        <Button
          onClick={() => generate(fileIds)}>
          Keyword Graph
        </Button>
        <br/>
        <svg
          ref={node => this.node = node}
          width={800}
          height={500}
        />
      </div>
    )
  }

}

export default KeywordGraph