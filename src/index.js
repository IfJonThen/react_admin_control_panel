import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Router,Route,IndexRoute, browserHistory} from 'react-router';
// import DropdownSection from './DropdownSection/DropdownSection';
/*eslint no-unused-vars: "off"*/

import MainView from './MainView';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <Route path="home" component={MainView}/>
    </Route>
    </Router>),
    document.getElementById('root')
);
