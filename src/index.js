import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/MainView';
import App from './components/App';
import PageNotFound from './components/PageNotFound';
import DropdownSection from './components/DropdownSection';
import {Router, Route,IndexPath,browserHistory} from 'react-router';
import './static/css/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

/*eslint no-useless-constructor:"off",
 no-unused-vars: "off"*/

window.onload=()=> {
    ReactDOM.render(
        (<Router history={browserHistory}>
            <Route path="/" component={App}>
                <Route path="home" component={MainView}/>
                <Route path="roster" component={DropdownSection}/>

            </Route>
            <Route path="*" component={PageNotFound}/>


        </Router>),
        document.getElementById('root')
    );
};