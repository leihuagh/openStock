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
    this.getCompanyInfo = this.getCompanyInfo.bind(this)

    this.state = {
      fetched: false,
      companyFetched: false,
      companyInfo: "",
      times: [],
      prices: [],
      d: []
    }

  }

  componentDidMount() {
    this.makeApiCall();
    this.getCompanyInfo();
  }

  componentWillUnmount() {

  }

  getCompanyInfo() {
    let parent = this;
    fetch('https://api.iextrading.com/1.0/stock/MSFT/company', {
      method: "GET",
    }).then(function(data) {
      return data.json()
    }).then(function(json) {
      console.log(json);
      parent.setState({
        companyFetched: true,
        companyInfo: json["description"]
      })
    });
  }

  makeApiCall(frequency = "1m") {
    let url = "https://api.iextrading.com/1.0/stock/aapl/chart/" + frequency;
    let timeParser = d3.timeParse("%Y-%m-%d");

    if (frequency == "1d") {
      timeParser = d3.timeParse("%Y-%m-%d %H:%M");
    }

    let parent = this;
    let prices = [];
    let times = [];

    d3.json(url).then(function(d){
      // Check for failure to retry.
      console.log(d);
      if (d[0]["date"] == null) {
        this.makeApiCall();
        return;
      }
      
      for (let i = 0; i < d.length; i++) {
        d[i]["date"] = timeParser(d[i]["date"]);
        times.push(d[i]["date"]);
        prices.push(d[i]["close"]);
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
    console.log(prices);
    console.log(times);
  }

  render(){
    return (
      <div className='Stock'>
        {this.state.fetched ? <Graph name="MSFT" times={this.state.times} prices={this.state.prices} d={this.state.d}/> : <p>Loading...</p>}
        {this.state.companyFetched ? <Company name="Microsoft" info={this.state.companyInfo}/> : <p> Loading... </p> }
        {this.state.fetched ? <Statistics prices={this.state.prices} interval ="Month"/> : <p> Loading... </p>}
      </div>
    );
  }

}

export default Info