import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Router,Route,IndexRoute, browserHistory} from 'react-router';
// import DropdownSection from './DropdownSection/DropdownSection';
import MainView from './MainView';
//
// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render((
    <Router history={browserHistory}>
    <Route path="/" component={App}>
        <IndexRoute component={MainView}/>
    </Route>
    </Router>),
    document.getElementById('root')
);
