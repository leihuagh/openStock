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
        <h2> Information </h2>
        <h3> Current Price </h3>
        <p> 10501.13 </p>
        <h3> Change </h3>
        <p> 45% </p>
        <h3> Past Hour </h3>
        <p> -40.32 </p>
      </div>
    );
  }
}

export default Statistics