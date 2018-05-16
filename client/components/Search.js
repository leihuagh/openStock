import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='search'>
        <input type="text" placeholder="Search.."/>
      </div>
    );
  }
}

export default Search