import React, { Component } from 'react';
import './App.css';
import {Route} from 'react-router-dom'
import Nav from './component/Nav/Nav'
import routes from './routes'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Route to='/' component={Nav} />
        {routes}
      </div>
    );
  } 
}
export default App;
