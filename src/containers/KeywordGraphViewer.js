import * as d3 from "d3"
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { getGraphData } from '../actions'
import {
  Button,
} from 'react-bootstrap'
import './KeywordGraphViewer.css'

/**
 * Displays a keyword collocation graph using d3
 */
class KeywordGraphViewer extends Component {
  static propTypes = {
    graphData: PropTypes.object,
    error: PropTypes.string,
    fileIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    dispatch: PropTypes.func.isRequired,
  }

  clearGraph() {
    d3.selectAll("svg > *").remove() // clear svg
  }

  renderGraph(graph) {
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height")

    var color = d3.scaleOrdinal(d3.schemeCategory20)

    var radius = 5 

    var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(d => d.id))
      .force("charge", d3.forceManyBody().strength(-5))
      .force("center", d3.forceCenter(width / 2, height / 2))

    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(graph.links)
      .enter().append("line")
        .attr("stroke-width", d => Math.sqrt(d.value) )

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(graph.nodes)
      .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended))

    node.append("circle")
        .attr("r", radius)
        .attr("fill", d => color(d.degree))

    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(d => d.id)
        .style('font-size', d => d.degree * 5)

    simulation
      .nodes(graph.nodes)
      .on("tick", ticked)

    simulation.force("link")
      .links(graph.links)

    function ticked() {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y)

      //constrains the nodes to be within a box
      node
        .attr("transform", 
          d => { 
            let dx = Math.max(radius, Math.min(width - radius, d.x))
            let dy = Math.max(radius, Math.min(height - radius, d.y))
            return `translate(${dx},${dy})`
          }
        )
    }

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(d) {
      d.fx = d3.event.x
      d.fy = d3.event.y
    }

    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
      return
    } else if (nextProps.graphData) {
      this.clearGraph()
      this.renderGraph(nextProps.graphData)
    } else {
      this.clearGraph()
    }
  }

  render() {
    const { fileIds, dispatch } = this.props
    return (
      <div>
        <Button
          onClick={() => dispatch(getGraphData(fileIds))}>
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

const mapStateToProps = state => {
  return {
    fileIds: state.files.selectedFiles.map(f => f.id),
    graphData: state.keywords.graphData,
    error: state.keywords.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeywordGraphViewer)