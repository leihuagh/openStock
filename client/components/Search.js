import React from 'react'
import PropTypes from 'prop-types'

class Search extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <div className='search'>
        <form action="./Stocks" method="get">
          <input type="text" name="symbol" placeholder="Enter Symbol.." id="submit"/>
          <button><i className="fas fa-search"></i></button>
        </form>
      </div>
    );
  }
}

export default Search