import React from 'react';
import PropTypes from 'prop-types';

import Company from '../components/Company.js';
import Graph from '../components/Graph.js';
import Statistics from '../components/Statistics.js';

class Home extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='Home'>
        <h1> Microsoft </h1>
        <Graph/>
        <Company/>
        <Statistics/>
      </div>
    );
  }

}

export default Home