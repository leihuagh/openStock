import React from 'react'
import PropTypes from 'prop-types'

import StatisticsTable from '../components/StatisticsTable.js'
import Spinner from '../components/Spinner.js';

class StocksStatistics extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fetchedGainers: false,
      fetchedLosers: false,
      fetchedActive: false,
      gainers: [],
      losers: [],
      active: []
    }
    this.getGainers = this.getGainers.bind(this);
    this.getLosers = this.getLosers.bind(this);
    this.getActive = this.getActive.bind(this);
  }

  componentDidMount() {
    this.getGainers();
    this.getLosers();
    this.getActive();  
  }

  getGainers() {
    let parent = this;
    fetch("https://api.iextrading.com/1.0/stock/market/list/gainers", { method: "GET", }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        fetchedGainers: true,
        gainers: json
      });
    });
  }

  getLosers() {
    let parent = this;
    fetch("https://api.iextrading.com/1.0/stock/market/list/losers", { method: "GET", }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        fetchedLosers: true,
        losers: json
      });
    });

  }

  getActive() {
    let parent = this;
    fetch("https://api.iextrading.com/1.0/stock/market/list/mostactive", { method: "GET", }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        fetchedActive: true,
        active: json
      });
    });
  }

  render() {
    console.log(this.state);
    return (
      <div className='StocksStats'>
        <div className="row">
          <div className='col-4'>
            { this.state.fetchedActive ? <StatisticsTable name='Most Active' data={this.state.active}/> : <Spinner/> }
          </div>
          <div className='col-4'>
            { this.state.fetchedGainers ? <StatisticsTable name='Gainers' data={this.state.gainers}/> : <Spinner/> }          
          </div>
          <div className='col-4'>
            { this.state.fetchedLosers ? <StatisticsTable name='Losers' data={this.state.losers}/> : <Spinner/> }
          </div>
        </div>
        <div className="row">
          <div className='col-4'></div>
          <div className='col-4'>
          </div>
          <div className='col-4'></div>
        </div>
        <div className="row">
          <div className='col-4'></div>
          <div className='col-4'>
          </div>
          <div className='col-4'></div>        
        </div>        
      </div>
    );
  }
}

export default StocksStatistics

