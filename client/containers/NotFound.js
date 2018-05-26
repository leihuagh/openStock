import React from 'react'
import PropTypes from 'prop-types'
import Search from '../components/Search.js'
import { Link } from 'react-router-dom'

class NotFound extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="col"></div>
        <div className="col">
          <div className='Error'>
            <h2>Error 404</h2>
            <p> Page Not Found </p>
          </div>
        </div>
        <div className="col"></div>
      </div>
    );
  }
}

export default NotFound

