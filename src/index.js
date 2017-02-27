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
import RosterView from './components/RosterView';
import MainController from './components/MainController';
// import * as firebase from 'firebase';



/*eslint no-useless-constructor:"off",
 no-unused-vars: "off"*/
browserHistory.listen(location=>{
    const path =(/#!(\/.*)$/.exec(location.hash)||[])[1];
    if(path){
        history.replace(path);
    }
});
// (<Router history={browserHistory}>
//     <Route path="/" component={()=>(<App/>)}>
//         {/*<Route path="home" component={MainView}/>*/}
//         {/*<Route path="roster" component={()=><App loc="roster"/>}/>*/}
//
//     </Route>
//     <Route path="*" component={PageNotFound}/>
//
//
// </Router>)
window.onload=()=> {
    ReactDOM.render(
        <App></App>,
        document.getElementById('root')
    );
};