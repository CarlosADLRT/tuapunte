import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router } from 'react-router-dom'
import './App.css';
import Dashboard from './dashboard'
import Register from './register';
import { Route } from 'react-router-dom'
import Login from './login';
import classDetail from './classDetail';
import Profile from './profile';

ReactDOM.render(
<Router>
    <div className="fill">
        <Route exact path='/' component={Login} />
        <div className="fill">
            <App/>
        <Route  path='/dashboard' component={Dashboard} />
        <Route  path='/register' component={Register} />
        <Route  path='/class/:key' component={classDetail} />
        <Route  path='/profile/:id' component={Profile} />
        </div>
    </div>
</Router> , document.getElementById('root'));
