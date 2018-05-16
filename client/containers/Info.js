import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from "d3";

import Company from '../components/Company.js';
import Graph from '../components/Graph.js';
import Statistics from '../components/Statistics.js';


class Info extends React.Component {
  constructor(props){
    super(props);
    this.changeActive = this.changeActive.bind(this);
    this.makeApiCall = this.makeApiCall.bind(this);
    this.getCompanyInfo = this.getCompanyInfo.bind(this);

    this.state = {
      fetched: false,
      companyFetched: false,
      companyInfo: "",
      interval: "",
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
      parent.setState({
        companyFetched: true,
        companyInfo: json["description"]
      })
    });
  }

  makeApiCall(frequency = "1y") {
    let url = "https://api.iextrading.com/1.0/stock/msft/chart/" + frequency;
    let timeParser = d3.timeParse("%Y-%m-%d");

    if (frequency == "1d") {
      timeParser = d3.timeParse("%Y%m%d%H:%M");
    }

    let parent = this;
    let prices = [];
    let times = [];

    d3.json(url).then(function(d){
      // Check for failure to retry.
      if (d[0]["date"] == null) {
        this.makeApiCall(frequency);
        return;
      }
      
      for (let i = 0; i < d.length; i++) {
        if (frequency == "1d") {
          d[i]["date"] = timeParser(d[i]["date"] + d[i]["minute"]);
          d[i]["close"] = d[i]["marketAverage"];
        } else {
          d[i]["date"] = timeParser(d[i]["date"]);
        }
        times.push(d[i]["date"]);
        prices.push(d[i]["close"]);
      }

      parent.setState({
        fetched: true,
        times: times,
        prices: prices,
        interval: frequency,
        d: d
      });

    }).catch(error => {
      console.error("error: ", error);
      this.makeApiCall(frequency);
      return;
    });
  }

  changeActive(id) {
    let buttons = document.getElementsByTagName("button");
  
    for(let i =0; i < buttons.length; i++) {
      buttons.item(i).classList.remove("active");
    }
    
    document.getElementById(id).classList.add("active");
    // Change graph to different one.
    this.makeApiCall(id);
  }

  // TODO: Replace loading with spinners in component.
  render(){
    return (
      <div className='Stock'>
        <h2>
         MSFT
        </h2>
        <h3>
          <button onClick={() => this.changeActive('1d')} id="1d" className="active">1D</button>
          <button onClick={() => this.changeActive('1m')} id="1m">1M</button>
          <button onClick={() => this.changeActive('3m')} id="3m">3M</button>
          <button onClick={() => this.changeActive('6m')} id="6m">6M</button>
          <button onClick={() => this.changeActive('1y')} id="1y">1Y</button>
          <button onClick={() => this.changeActive('5y')} id="5y">5Y</button>
         </h3>
        {this.state.fetched ? <Graph times={this.state.times} prices={this.state.prices} d={this.state.d}/> : <p>Loading...</p>}
        {this.state.companyFetched ? <Company name="Microsoft" info={this.state.companyInfo}/> : <p> Loading... </p> }
        {this.state.fetched ? <Statistics prices={this.state.prices} interval ={this.state.interval}/> : <p> Loading... </p>}
      </div>
    );
  }

}

export default Info