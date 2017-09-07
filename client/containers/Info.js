import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Company from '../components/Company.js';
import Graph from '../components/Graph.js';
import Statistics from '../components/Statistics.js';


function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

class Info extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className='Stock'>
        <Graph/>
        <Company/>
        <Statistics/>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Info)