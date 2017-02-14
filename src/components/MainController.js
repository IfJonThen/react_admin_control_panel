import React, { Component } from 'react';
import logo from '../logo.svg';
import '../static/css/App.css';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {browserHistory,Router} from 'react-router';
import {Grid} from 'react-bootstrap';
import MainView from './MainView';
import SplitView from './SplitView';
import DropdownSection, {Section} from './DropdownSection';
import {Button} from './ButtonGroup';
import RosterView from './RosterView';
import LogInControl from './LogInControl';
import {login,logout} from '../static/js/firebaseAuth';
/*eslint no-unused-vars: "off"*/

class MainController extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:false};
        this.handleLogInChange=this.handleLogInChange.bind(this);
        this.goSomeWhere=this.goSomeWhere.bind(this);
        // this.onChange=this.onChange.bind(this);
        this.onSelect=this.onSelect.bind(this);
        console.log("MainController.js: state.isLoggedIn:"+this.state.isLoggedIn);
        let l = {email:"pikahatonjon@gmail.com",password:"password"};
        login(l);
    }
    goSomeWhere() {
        this.setState({isLoggedIn:true});
        // this.setState({loc:"roster"});
        // browserHistory.push('roster');
    }
    onSelect(data){
        console.log("MainController()::updateLoc  changing views thanks to loc "+data);
        // this.setState({"loc"});
    }
    handleLogInChange(e){
        console.log("MainController.js: handleLogInChange() before state:"+e);
        this.setState({isLoggedIn:e},()=>{
            setTimeout(()=>{
                console.log("App.js: handleLogInChange() after state:"+this.state.isLoggedIn)
            },500);
             });
    }
    render() {
        console.log("MainController.js render(): state.isLoggedIn:"+this.state.isLoggedIn);
        var nvbar =null;
        if(!this.state.isLoggedIn) {

                nvbar=<div id="loginTemp">
                    <button onClick={this.goSomeWhere}>Log In</button>
                </div>;

        }
        else{
            nvbar=<NavBar loc="home"/>;
        }
        return (<div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome</h2>
                </div>
                {nvbar}
            </div>
        );
    }
}
export default MainController;
// export class mainLayout{}
