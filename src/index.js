import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css'
import { HashRouter } from 'react-router-dom'
import './App.css';
import Dashboard from './dashboard'
import Register from './register';
import { Route } from 'react-router-dom'
import Login from './login';
import classDetail from './classDetail';

ReactDOM.render(
<HashRouter>
    <div className="fill">

        <Route exact path='/' component={Login} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/class/:key' component={classDetail} />
    </div>
</HashRouter> , document.getElementById('root'));
