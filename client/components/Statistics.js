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
        <p> 10501.13 </p>
        <br/>
        <h2> Change </h2>
        <p> 45% </p>
        <br/>
        <h2> Past Hour </h2>
        <p> -40.32 </p>
        <br/>
      </div>
    );
  }
}

export default Statistics