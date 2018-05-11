import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Company extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='header'>
        <h1> OpenStock </h1>
      </div>
    );
  }
}

export default Company