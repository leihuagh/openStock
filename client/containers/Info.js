import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
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
    this.getPeers = this.getPeers.bind(this);

    this.state = {
      fetched: false,
      companyFetched: false,
      peersFetched: false,
      hasError: false,
      companyInfo: "",
      companyName: "",
      interval: "",
      times: [],
      prices: [],
      d: [],
      peers: [],
      peerData: {}
    }

  }

  componentDidMount() {
    this.makeApiCall();
    this.getCompanyInfo();
    this.getPeers();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.symbol != this.props.symbol) {
      this.setState({
        fetched: false,
        companyFetched: false,
        peersFetched: false,
        hasError: false,
        companyInfo: "",
        companyName: "",
        interval: "",
        times: [],
        prices: [],
        d: [],
        peers: [],
        peerData: {}
      });
      this.makeApiCall();
      this.getCompanyInfo();
      this.getPeers();
    }
  }

  componentWillUnmount() {

  }

  getPeers() {
    let parent = this;
    let symbols;
    // API CALL
    // Seperate symbols with a,b,c
    // https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1d
    // Get Rivals and batch call.
    fetch("https://api.iextrading.com/1.0/stock/"  + this.props.symbol + "/peers", {
      method: "GET",
    }).then(function(data) {
      return data.json()
    }).then(function(json) {
      let s = "";
      symbols = json;
      console.log(json);
      json.forEach(symbol => {
        s += (symbol + ",")
      });

      fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=' + s + '&types=quote', {
        method: 'GET',
      }).then(function(data) {
        return data.json()
      }).then(function(json) {
        console.log(json);
        parent.setState({
          peersFetched: true,
          peers: symbols,
          peerData: json
        });
      })
    });
  }

  getCompanyInfo() {
    let parent = this;
    fetch("https://api.iextrading.com/1.0/stock/"  + this.props.symbol + "/company", {
      method: "GET",
    }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        companyFetched: true,
        companyInfo: json["description"],
        companyName: json["companyName"]
      })
    });
  }

  makeApiCall(frequency = "1d") {
    let url = "https://api.iextrading.com/1.0/stock/" +  this.props.symbol + "/chart/" + frequency;
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
        if (d[i]["marketNumberOfTrades"] == 0 || d[i]["marketAverage"] == -1) {
          d.splice(i, 1);
          i--;
          continue;
        }

        if (frequency == "1d") {
          d[i]["close"] = d[i]["marketAverage"];
          d[i]["date"] = timeParser(d[i]["date"] + d[i]["minute"]);
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
      parent.setState({
        hasError: true
      });
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
  render() {
    console.log(this.state.peerData)
    const peers = this.state.peers > 0 ?  <div className="col peers-card"> No Peers </div> : this.state.peers.map((peer) =>
      <Link to={"/Stocks?symbol=" + peer.toString()} className="col peers-card" key={peer.toString()}>
          <span> {peer} </span>
          <br/>
          <span>${this.state.peerData[peer]['quote']['latestPrice']}</span>
      </Link>
    );
      
    if (this.state.hasError) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col"></div>
            <div className="col">
              <div className='Stock'>
                <h2>
                  {this.props.symbol.toUpperCase()}
                </h2>
                <p> Failed to Load </p>
              </div>
            </div>
            <div className="col"></div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col">
              <div className='Stock'>
                <h2>
                 {this.state.companyName} ({this.props.symbol.toUpperCase()})
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
              </div>
            </div>
            <div className="col-sm-3"></div>
          </div>
          <div className="row">
            <div className="col-sm-3"></div>
            <div className="col-sm-3">{this.state.companyFetched ? <Company name={this.state.companyName} info={this.state.companyInfo}/> : <p> Loading... </p> }</div>
            <div className="col-sm-3">{this.state.fetched ? <Statistics prices={this.state.prices} interval ={this.state.interval}/> : <p> Loading... </p>}</div>
            <div className="col-sm-3"></div>          
          </div>
          <div className="row">
            <div className="col-3"></div>
            {this.state.peersFetched ? 
              <div className="col-6">
                <div className='row'>
                  {peers} 
                </div>
              </div> : <p> Loading... </p> }
            <div className="col-3"></div>
          </div>
        </div>
      );
    }
  }

}

export default Info