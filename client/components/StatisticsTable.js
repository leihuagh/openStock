import React from 'react'
import PropTypes from 'prop-types'

class StatisticsTable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      
    return (
      <div className='statisticsTable'>
        <h2> {this.props.name} </h2>
      </div>
    );
  }
}

export default StatisticsTable