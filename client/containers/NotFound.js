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
      <div className="container-fluid">
        <div className="row">
          <div className="col"></div>
          <div className="col">
            <div className='error'>
              <h2>404</h2>
              <p> Page Not Found </p>
            </div>
          </div>
          <div className="col"></div>
        </div>
      </div>
    );
  }
}

export default NotFound

