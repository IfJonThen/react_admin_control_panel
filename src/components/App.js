import React, { Component } from 'react';
import logo from '../logo.svg';
import '../static/css/App.css';
import NavExample from './Nav';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {browserHistory,Router} from 'react-router';
import {Grid} from 'react-bootstrap';
import MainView from './MainView';
import SplitView from './SplitView';
import DropdownSection, {Section} from './DropdownSection';
import {Button} from './ButtonGroup';
import ClassTabView from './ClassTabView';
import RosterView from './RosterView';
import LogInControl from './LogInControl';
import NavBar from './NavBar';
import {login,logout} from '../static/js/firebaseAuth';
/*eslint no-unused-vars: "off"*/

class App extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:true,loc:props.loc};
        this.handleLogInChange=this.handleLogInChange.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.handleNavClick=this.handleNavClick.bind(this);
        console.log("App.js: state.loc:"+this.state.loc);
        let l = {email:"pikahatonjon@gmail.com",password:"password"};
        login(l);
    }

    /*App()::conSelect(data);
    * no functionality at the moment
    * */
    onSelect(data){
        console.log("App()::updateLoc  changing views thanks to loc "+data);
        // this.setState({"loc"});
    }
    /*App()::handleNavClick():
    * helper function for NavBar. updates state
    * */
    handleNavClick(nav){
        this.setState({loc:nav});
    }
    handleLogInChange(e){
        console.log("App.js: handleLogInChange() before state:"+e);
        this.setState({isLoggedIn:e},()=>{
            setTimeout(()=>{
                console.log("App.js: handleLogInChange() after state:"+this.state.isLoggedIn)
            },500);
             });
    }
    render() {
        console.log("App.js render(): state.loc:"+this.state.loc);
        var navbar =null;
        var base = null;
        if(this.state.isLoggedIn) {
            navbar =(<div>
                    <NavBar handleClick={this.handleNavClick}/>
                </div>);

            //LogIn render condition
            if (this.state.loc === undefined){
                document.body.style.backgroundColor="white";
                navbar=<div id="loginTemp">
                    <button onClick={()=>{this.setState({loc:"classes"})}}>Log In</button>
                </div>;
            }
            else {
                //sets body to grey color if logged in
                document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
                //roster render condition
                if (this.state.loc === "roster") {

                    var s = <Button id="AddM" value="Add Member"></Button>;
                    var t = (<DropdownSection/>);
                    base = <RosterView db={this.props.db}/>;
                }
                //home render condition
                else if (this.state.loc === "home") {
                    base = <MainView/>;
                }
                else if (this.state.loc==="classes"){
                    base=<ClassTabView/>;
                }
            }
        }
        else{
             navbar = <LogInControl onClick={this.handleLogInChange} isLoggedin={this.state.isLoggedIn} t={this.props.children}/>
        }
                return (<div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome</h2>
                            </div>
                        {navbar}
                        {base}
            </div>
        );
    }
}


export default App;
