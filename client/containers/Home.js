import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Search from '../components/Search.js'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='home'>
        <h1>OpenStock</h1>
        <Search/>
      </div>
    );
  }
}

export default Home

