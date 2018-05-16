import React from 'react'
import PropTypes from 'prop-types'
import Search from '../components/Search.js'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='home'>
        <Link to='/'> <h1>OpenStock</h1> </Link>
        <Search className='homeSearch'/>
      </div>
    );
  }
}

export default Home

