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
        <h2> Microsoft </h2>
        <p> Microsoft Corporation is an American multinational technology company with headquarters in Redmond, Washington. 
        It develops, manufactures, licenses, supports and sells computer software, consumer electronics, personal computers, and services. </p>
      </div>
    );
  }
}

export default Company