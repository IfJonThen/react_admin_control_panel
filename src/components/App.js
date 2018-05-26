import React, { Component } from 'react';
import logo from '../logo.svg';
import '../static/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import MainView from './MainView';
import SplitView from './SplitView';
import {ButtonGroup} from './ButtonGroup';
import ClassTabView from './ClassTabView';
import RosterView from './RosterView';
import LogInControl from './LogInControl';
import NavBar from './NavBar';
import {base} from '../static/js/firebaseRef';
import {login,logout} from '../static/js/firebaseAuth';
/*eslint no-unused-vars: "off"*/
import {AuthService} from '../utils/AuthService';
class App extends Component {
    constructor(){
        super();
        this.state={cred:[],isLoggedIn:false,loc:undefined,alpha:false,nav:'home'};
        this.logInCheck=this.logInCheck.bind(this);
        this.checkLogIn=this.checkLogIn.bind(this);
        this.handleNavClick=this.handleNavClick.bind(this);
        this.handleMainClick=this.handleMainClick.bind(this);
        console.log("App.js: state.loc:"+this.state.loc);
        this.checkLogIn(["j","yuen"]);
        this.person = null;
    }
    /*App()::handleNavClick():
    * helper function for NavBar. updates state
    * */
    handleMainClick(nav){
        console.log(nav);
        switch(nav){
            case "AttendanceBtn":
                this.setState({nav:nav});
                break;
            case "FormBtn":
                alert("forms");
                this.setState({nav:nav});
                break;
            case "CalBtn":
                this.setState({nav:nav});
                break;
            default:
                this.setState({nav:nav});
                break;
        }
    }
    handleNavClick(nav){
        console.log(nav);
        switch(nav){
            case 'home':
                this.setState({nav:nav,loc:nav});
                break;
            case 'database':
                this.setState({loc:nav});
                break;
            case 'logout':
                this.setState({isLoggedIn:false});
                break;
            case 'alpha':
                this.setState({alpha:true});
                break;
            default:
                this.setState({loc:nav});
                break;
        }
    }
    /*App ():: logInCheck():
    * checks if user is logged in
    * */
    logInCheck(event){
        this.checkLogIn(event);

        // let login=false;
        let login=true;
        // for (let i =0; i<this.state.cred.length;i++){
        //     if (this.state.cred[i]["username"]===event[0]&& this.state.cred[i]["password"]===event[1]){
        //         login=true;
        //         this.person=this.state.cred[i]["username"];
        //     }
        // }
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
            switch(this.state.loc){
                default:
                    document.body.style.backgroundColor = "rgba(0,0,0,0.3)";
                    break;
                case "database":
                    alert("database");
                    break;
                case undefined:
                    alert("alert");
                    document.body.style.backgroundColor="white";
                    navbar=<div id="loginTemp">
                        <LogInControl isLoggedin={this.logInCheck}/>
                    </div>;
                        break;
                case "roster":
                    base = <RosterView base={this.state.base} db={this.props.db}/>;
                    break;
                case "home":
                    base = <MainView handleClick={this.handleMainClick}nv={this.state.nav}/>;
                    break;
                case "classes":
                    base=<ClassTabView/>;
                    break;

            }
        }
        else{
            document.body.style.backgroundColor = "rgba(119,119,119,0.5)";
            navbar = <LogInControl isLoggedin={this.logInCheck}/>
        }
        return (<div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome {this.person}</h2>
                            </div>
                        {navbar}
                        {base}
            </div>
        );
    }
}


export default App;
