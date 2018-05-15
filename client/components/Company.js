import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Company extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='company'>
        <h2> {this.props.name} </h2>
        <p> {this.props.info} </p>
      </div>
    );
  }
}

export default Company