import React from 'react'
import PropTypes from 'prop-types'

import Info from './Info.js'

class Stocks extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const params = new URLSearchParams(this.props.location.search);
    const symbol = params.get('symbol');
    const hasSymbol = symbol != null;
    return (
      <div className='Stocks'>
        {hasSymbol ? <Info symbol={symbol}/> : <p>Weee</p>}
      </div>
    );
  }
}

export default Stocks

