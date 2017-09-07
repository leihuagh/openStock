import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Sidebar from './components/Sidebar.js';
import Home from './components/Home.js';
import Info from './containers/info.js';
import Search from './containers/Search.js';
import Results from './containers/Results.js';
import Stocks from './containers/Stocks.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <Sidebar/>
        <div>
          <Switch>
            <Route exact path='/' component={Info}/>
            <Route path='/search' component={Results}/>
            <Route path='/Stocks' component={Stocks}/>
            <Route path='/Stocks/:symbol' component={Info}/>
          </Switch>
        </div>
      </div>
    );
  }
}