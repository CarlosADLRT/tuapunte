import React, {Component} from 'react';
import './App.css';
import Dashboard from './dashboard'
import Register from './register';
import {  Route  } from 'react-router-dom'
import Login from './login';
import classDetail from './classDetail';

class App extends Component {
  render() {
    return (
        <div className="bg">
          <Route exact path='/' component={Login}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/register' component={Register}/>
            <Route exact path='/class/:key' component={classDetail}/>
        </div>
    );
  }
}

export default App;
