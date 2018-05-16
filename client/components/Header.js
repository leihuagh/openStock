import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Company extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <Link to='/'> <h1>OpenStock</h1> </Link>
      </header>
    );
  }
}

export default Company