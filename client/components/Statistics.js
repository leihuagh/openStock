import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class Statistics extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='statistics'>
        <h2> Current Price </h2>
      </div>
    );
  }
}

export default Statistics