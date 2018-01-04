import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Row,
  Col,
  FormControl,
} from 'react-bootstrap'

/**
 * Represents a spinner for the user to choose a number
 */
class NumberSpinner extends Component {
  static propTypes = {
    min: PropTypes.number.isRequired,
    max: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.state = { count: props.min || 0 }
  }

  decrement() {
    const newCount = Math.max(this.state.count - 1, this.props.min)
    this.setState({ count: newCount })
    this.props.onChange(newCount)
  }

  increment() {
    const newCount = Math.min(this.state.count + 1, this.props.max)
    this.setState({ count: newCount })
    this.props.onChange(newCount)
  }

  render() {
    return (
      <Row>
        <Col xs={1}>
          <Button
            onClick={this.decrement.bind(this)}
          >-</Button>
        </Col>
        <Col xs={1}>
          <FormControl
            type="text"
            readOnly
            value={this.state.count}
          />
        </Col>
        <Col xs={1}>
          <Button
            onClick={this.increment.bind(this)}
          >+</Button>
        </Col>
      </Row>
    )
  }
}

export default NumberSpinner