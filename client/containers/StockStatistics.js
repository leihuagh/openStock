import React from 'react'
import PropTypes from 'prop-types'

import StatisticsTable from '../components/StatisticsTable.js'

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
    this.getGainersLosersActive = this.getGainersLosersActive.bind(this);
  }

  componentDidMount() {
    this.getGainersLosersActive();
  }

  getGainersLosersActive() {
    let parent = this;
    fetch("https://api.iextrading.com/1.0/stock/market/list/gainers", { method: "GET", }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        fetchedGainers: true,
        gainers: json
      });
    });

    fetch("https://api.iextrading.com/1.0/stock/market/list/losers", { method: "GET", }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        fetchedLosers: true,
        losers: json
      });
    });

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
        <StatisticsTable name='Gainers'/>
        <StatisticsTable name='Losers'/>
        <StatisticsTable name='Most Active'/>
        <StatisticsTable name='Stocks'/>
      </div>
    );
  }
}

export default StocksStatistics

