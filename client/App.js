import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header.js';
import Home from './containers/Home.js';
import Info from './containers/Info.js';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header/>
        <div>
          <Switch>
            <Route exact path='/' component={Info}/>
            <Route path='/Stocks/:symbol' component={Info}/>
          </Switch>
        </div>
      </div>
    );
  }
}