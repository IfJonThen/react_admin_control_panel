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
import Rebase from 're-base';

// import * as firebase from 'firebase';

var fb = Rebase.createClass({apikey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
});

// var config ={apikey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
//     authDomain:"classexaminer.firebaseapp.com",
//     databaseURL:"https://classexaminer.firebaseio.com",
//     storageBucket:"classexaminer.appspot.com",
// };
// initializeApp(config).database().ref();
/*eslint no-useless-constructor:"off",
 no-unused-vars: "off"*/

window.onload=()=> {
    ReactDOM.render(
        (<Router history={browserHistory}>
            <Route path="/" component={()=>(<App db={fb}/>)}>
                <Route path="home" component={MainView}/>
                <Route path="roster" component={DropdownSection}/>

            </Route>
            <Route path="*" component={PageNotFound}/>


        </Router>),
        document.getElementById('root')
    );
};