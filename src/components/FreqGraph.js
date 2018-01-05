import * as d3 from 'd3'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import './FreqGraph.css'

/**
 * Displays graph of word frequencies
 */
class FreqGraph extends Component {
  static propTypes = {
    freqData: PropTypes.object,
    error: PropTypes.object,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error) {
      alert(nextProps.error)
    } else if (nextProps.freqData) {
      FreqGraph.clearGraph()
      FreqGraph.renderGraph(nextProps.freqData)
    } else {
      FreqGraph.clearGraph()
    }
  }

  static clearGraph() {
    d3.selectAll('.freqgraph > *').remove()
  }

  static renderGraph(data) {
    const margin = {top: 20, right: 20, bottom: 30, left: 40}

    const svg = d3.select('.freqgraph'),
      width = +svg.attr('width') - margin.left - margin.right,
      height = +svg.attr('height') - margin.top - margin.bottom

    const x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
      y = d3.scaleLinear().rangeRound([height, 0])

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    x.domain(data.map(d => d.word ))
    y.domain([0, d3.max(data, d => d.freq)])

    g.append('g')
      .attr('class', 'axis axis_x')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))

    g.append('g')
      .attr('class', 'axis axis_y')
      .call(d3.axisLeft(y).ticks(10))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'end')
      .text('Frequency')

    g.selectAll('.bar')
      .data(data)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.word) )
      .attr('y', d => y(d.freq) )
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.freq))

    svg.select('.axis')
      .selectAll('text')
      .style('font-size','20px')
  }

  render() {
    return (
      <svg
        className='freqgraph'
        ref={node => this.node = node}
        width={800}
        height={500}
      />
    )
  }
}

export default FreqGraph