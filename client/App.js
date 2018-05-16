import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './containers/Home.js';
import Stocks from './containers/Stocks.js';
import Info from './containers/Info.js';
import NotFound from './containers/NotFound.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/Stocks' component={Stocks}/>
            <Route exact path='/Stocks/:symbol' component={Info}/>
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}