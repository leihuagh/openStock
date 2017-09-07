import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from '../containers/Search.js'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <div className='menu'>
          <Link to='/'>OpenHause</Link>
          <Link to='/item/:id'>Statistics</Link>
          <Link to='/items'>Items</Link>
          <Search/>
        </div>
      </header>
    );
  }
}

export default Header