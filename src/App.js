import React, {Component} from 'react';
import './App.css';
import Dashboard from './dashboard'
import Register from './register';
import { BrowserRouter, Route, Link,  } from 'react-router-dom'
import Login from './login';

class App extends Component {
  render() {
    return (
        <div className="bg">
          <Route exact path='/' component={Login}/>
          <Route exact path='/dashboard' component={Dashboard}/>
          <Route exact path='/register' component={Register}/>
        </div>
    );
  }
}

export default App;
