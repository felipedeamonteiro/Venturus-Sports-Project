import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './components/Home';
import UserTable from './components/UserTable';
import Form from './components/Form';
import ErrorPath from './components/ErrorPath';
import { Route, Switch } from 'react-router-dom';
import {browserHistory, Router} from 'react-router';




ReactDOM.render(
    (<Router history={browserHistory}>
        <Route component={App} exact={true}>
            <Switch>
                <Route path="/" component={Home} exact={true}/>
                <Route path="/users" component={UserTable} exact={true}/>
                <Route path="/users/new" component={Form} exact={true}/>
                <Route path="*" component={ErrorPath}/>
            </Switch>
        </Route>
    </Router>),
    document.getElementById('root')
);
