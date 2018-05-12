import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import Company from '../components/Company.js';
import Graph from '../components/Graph.js';
import Statistics from '../components/Statistics.js';


class Info extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }
  
  render(){
    return (
      <div className='Stock'>
        <Graph name="Microsoft"/>
        <Company name="Microsoft"/>
        <Statistics/>
      </div>
    );
  }

}

export default Info