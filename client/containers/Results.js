import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Company from '../components/Company.js';

function mapStateToProps(state){
  return {

  }
}

function mapDispatchToProps(dispatch){
  return {
    
  }
}

class Results extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div></div>
        
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Results)