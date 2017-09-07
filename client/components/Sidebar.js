import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from '../containers/Search.js'

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <ul className='list'>
          <li><Link to='/'>OpenHause</Link></li>
          <li><Link to='/item/:id'>Statistics</Link></li>
          <li><Link to='/items'>Items</Link></li>
          <li><Search/></li>
        </ul>
    );
  }
}

export default Sidebar