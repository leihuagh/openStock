import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Search from './Search';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <header>
        <Link to='/' className='logo-btn'>OpenStock</Link>
        {/* <div className='search-header'>
          <Search/>
        </div> */}
        {/* <Link to='/Stocks' className='stock-btn'>Stocks</Link> */}
      </header>
    );
  }
}

export default Header