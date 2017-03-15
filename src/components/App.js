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
import {base} from '../static/js/firebaseRef';
import firebase from 'firebase';
import {login,logout} from '../static/js/firebaseAuth';
/*eslint no-unused-vars: "off"*/
import {AuthService} from '../utils/AuthService';
class App extends Component {
    constructor(){
        super();
        this.state={cred:[],isLoggedIn:false,loc:undefined};
        this.logInCheck=this.logInCheck.bind(this);
        this.checkLogIn=this.checkLogIn.bind(this);
        this.handleNavClick=this.handleNavClick.bind(this);
        console.log("App.js: state.loc:"+this.state.loc);
        this.checkLogIn(["j","yuen"]);


    }
    /*App()::handleNavClick():
    * helper function for NavBar. updates state
    * */
    handleNavClick(nav){
        if (nav==="logout"){
            this.setState({isLoggedIn:false});
        }
        else if (nav==="attendance"){
            this.setState({loc:"home"});
        }
        else {
            this.setState({loc:nav});
        }
    }


    /*App ():: logInCheck():
    * checks if user is logged in
    * */
    logInCheck(event){
       //Note: The user's password is NOT the password used to access the user's email account.
        // The email address serves as a unique identifier for the user, and the password is used to access the user's account in your Firebase project.

        this.checkLogIn(event);
       //  firebase.auth().signInWithEmailAndPassword().catch(function(error){
       //      let errorCode = error.code;
       //      let errorMessage = error.message;
       //      switch(errorCode){
       //          case 'auth/wrongpassword':
       //              alert("incorrect password");
       //              break;
       //          case 'auth/wrongpassword':
       //              alert("incorrect password");
       //              break;
       //          case 'auth/wrongpassword':
       //              alert("incorrect password");
       //              break;
       //          case 'auth/wrongpassword':
       //              alert("incorrect password");
       //              break;
       //      }
       // });

        let login=false;
        for (let i =0; i<this.state.cred.length;i++){
            if (this.state.cred[i]["username"]===event[0]&& this.state.cred[i]["password"]===event[1]){
                login=true;
            }
        }
        if (login){
            alert("Login Successful");
            this.setState({isLoggedIn:true,loc:"home"});

        }
        else{
            alert("Incorrect Username and Password");

        }
       //  this.setState({isLoggedIn:true,loc:"home"});
        //

        if (!login) {
        }
    }
    checkLogIn(event){
        // alert(cred);
        base.fetch("cabinet", {
            context: this, asArray: true,
        }).then(data=>
        {

                // alert(data.length);
           this.setState({cred:data});
        }).catch(error=>{
            console.log("App::checkLogIn():: fetch error");
        });
    }
    render() {
        console.log("App.js render(): state.loc:"+this.state.loc);
        var navbar =null;
        var base = null;
        console.log(this.state.isLoggedIn);
        if(this.state.isLoggedIn) {
            navbar =(<div>
                    <NavBar handleClick={this.handleNavClick}/>
                </div>);

            //LogIn render condition
            if (this.state.loc === undefined){
                document.body.style.backgroundColor="white";
                navbar=<div id="loginTemp">
                    <LogInControl isLoggedin={this.logInCheck}/>
                </div>;
            }
            else {
                //sets body to grey color if logged in
                document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
                if (this.state.loc === "roster") {
                    var s = <Button id="AddM" value="Add Member"></Button>;
                    var t = (<DropdownSection/>);
                    base = <RosterView base={this.state.base} db={this.props.db}/>;
                }
                //home render condition
                else if (this.state.loc === "home") {
                    base = <MainView handleClick={this.handleNavClick}nv={this.state.loc}/>;
                }
                else if (this.state.loc==="classes"){
                    base=<ClassTabView/>;
                }
            }
        }
        else{
            document.body.style.backgroundColor = "rgba(255,255,255,1)";
            navbar = <LogInControl isLoggedin={this.logInCheck}/>
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
