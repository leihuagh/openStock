import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import Company from '../components/Company.js';
import Graph from '../components/Graph.js';
import Statistics from '../components/Statistics.js';


class Info extends React.Component {
  constructor(props){
    super(props);
    this.makeApiCall = this.makeApiCall.bind(this)
    this.state = {
      fetched: false,
      times: [],
      prices: [],
      d: []
    }

  }

  componentDidMount() {
    this.makeApiCall();
  }

  componentWillUnmount() {

  }
  
  makeApiCall() {
    let url = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_INTRADAY&symbol=BTC&market=USD&apikey=235YGSKH6SQMLSTA&datatype=csv";
    let timeParser = d3.timeParse("%Y-%m-%d %H:%M:%S");
    let parent = this;
    let prices = [];
    let times = [];

    d3.csv(url, function(data) {
      data["timestamp"] = timeParser(data["timestamp"]);
      data["price"] = +data["price (USD)"];
      prices.push(+data["price (USD)"]);
      times.push(data["timestamp"]);
      return data;
    }).then(function(d){
      // Check for failure to retry.
      if (d[0]["timestamp"] == null) {
        this.makeApiCall();
        return;
      }
      
      parent.setState({
        fetched: true,
        times: times,
        prices: prices,
        d: d
      });

    }).catch(error => {
      console.error("error: ", error);
      this.makeApiCall();
      return;
    });
  }

  render(){
    return (
      <div className='Stock'>
        {this.state.fetched ? <Graph name="MSFT" times={this.state.times} prices={this.state.prices} d={this.state.d}/> : <p>Loading...</p>}
        <Company name="Microsoft"/>
        <Statistics/>
      </div>
    );
  }

}

export default Info