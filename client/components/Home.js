import React from 'react'
import PropTypes from 'prop-types'
import Searcher from '../containers/Search.js'
import { Link } from 'react-router-dom'

class Home extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <div className='home'>
        <h1> OpenStock </h1>
        <Search className='homeSearch'/>
      </div>
    );
  }
}

export default Home

