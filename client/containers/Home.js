import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import StackedBarGraph from '../components/StackedBarGraph.js';
import CardGraph from '../components/CardGraph.js';
import Spinner from '../components/Spinner.js';
import Search from '../components/Search.js';

class Home extends React.Component {

  constructor(props) {
    super(props);

    this.getExchanges = this.getExchanges.bind(this);
    this.getMarket = this.getMarket.bind(this);

    this.state = {
      stocksFetched: false,
      marketFetched: false,
      stocks: [],
      stocksData: {},
      marketData: {}
    }
  }

  componentDidMount() {
    this.getExchanges();
    this.getMarket();
  }

  getExchanges() {
    // API CALL
    // https://api.iextrading.com/1.0/stock/market/batch?symbols=aapl,fb&types=quote,chart&range=1d
    // Get Exchanges and batch call.
    let parent = this;    
    fetch('https://api.iextrading.com/1.0/stock/market/batch?symbols=NDAQ,SPY,DIA&types=quote,chart&range=1d', {
      method: 'GET',
    }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        stocksFetched: true,
        stocks: ['NDAQ', 'SPY', 'DIA'],
        stocksData: json
      });
    }).catch(function(){

    });
  }

  getMarket() {
    // API CALL
    // https://api.iextrading.com/1.0/market
    let parent = this;
    fetch('https://api.iextrading.com/1.0/market', {
      method: 'GET',
    }).then(function(data) {
      return data.json()
    }).then(function(json) {
      parent.setState({
        marketFetched: true,
        marketData: json
      });
    }).catch(function(){

    });
  }

  render() {
    console.log(this.state);
    const NDAQ = this.state.stocksData['NDAQ'];
    const DIA = this.state.stocksData['DIA'];
    const SPY = this.state.stocksData['SPY'];

    return (
      <div className="container-fluid">
          <div className="row">
            <div className="col-3"></div>
            <div className="col-6 market card">
              <h2 className='large'> The Market </h2>
              {this.state.marketFetched ? <StackedBarGraph name='market'  d={this.state.marketData}/> : <Spinner/> }
            </div>
            <div className="col-3"></div>
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col"></div>
            <div className="col card-stock">
              {this.state.stocksFetched ? <CardGraph name='NDAQ' d={NDAQ.chart} companyName="Nasdaq Inc." latestPrice={NDAQ.quote.latestPrice} changePercent={NDAQ.quote.changePercent} volume={NDAQ.quote.latestVolume}/> : <Spinner/> }
            </div>
            <div className="col card-stock">
              {this.state.stocksFetched ? <CardGraph name='SPY' d={SPY.chart} companyName="S&P 500" latestPrice={SPY.quote.latestPrice} changePercent={SPY.quote.changePercent} volume={SPY.quote.latestVolume}/> : <Spinner/> }
            </div>
            <div className="col card-stock">
              {this.state.stocksFetched ? <CardGraph name='DIA' d={DIA.chart} companyName="Dow Jones" latestPrice={DIA.quote.latestPrice } changePercent={DIA.quote.changePercent} volume={DIA.quote.latestVolume}/> : <Spinner/> }
            </div>
            <div className="col"></div>
            <div className="col"></div>
          </div>
          <div className="row"></div>
        </div>
    );
  }
}

export default Home

