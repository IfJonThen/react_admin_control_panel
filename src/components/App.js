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
        this.goSomeWhere=this.goSomeWhere.bind(this);
        // this.onChange=this.onChange.bind(this);
        this.onSelect=this.onSelect.bind(this);
        this.handleNavClick=this.handleNavClick.bind(this);
        console.log("App.js: state.loc:"+this.state.loc);
        let l = {email:"pikahatonjon@gmail.com",password:"password"};
        login(l);
    }
    goSomeWhere() {
        this.setState({loc:"roster"});
        // browserHistory.push('home');
    }
    onSelect(data){
        console.log("App()::updateLoc  changing views thanks to loc "+data);
        // this.setState({"loc"});
    }
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
            navbar =(
                <div>
                    {/*<NavExample onSelect={this.onSelect}loc={this.state.loc}/>*/}
                    <NavBar handleClick={this.handleNavClick}/>
                </div>);
            if (this.state.loc === undefined){
                document.body.style.backgroundColor="white";
                navbar=<div id="loginTemp">
                    <button onClick={this.goSomeWhere}>Log In</button>
                </div>;
            }
            else if (this.state.loc==="roster"){
                document.body.style.backgroundColor="rgba(0,0,0,0.3)";

                var s = <Button id="AddM" value="Add Member"></Button>;
                var t=(<DropdownSection/>);
                base=<RosterView db={this.props.db}/>;
                //show roster
            }
            else if (this.state.loc==="home"){
                base= <MainView/>;
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
                        {/*<Greeting isLoggedIn={this.state.isLoggedIn} t={this.props.children}/>*/}
            </div>
        );
    }
}
function Greeting(props){

    var isLoggedIn = props.isLoggedIn;
    let v = (<div><NavExample/><Grid fluid={true}>{props.t}</Grid></div>);

    if(isLoggedIn){
        return (v
        );
        // return (props.t);
    }
    else{
        return (<div>
            <h2>Please Log In.</h2>
            {/*<LogInForm/>*/}
            {/*<LogInControl onChange={props.handleLoginChange} isLoggedIn={isLoggedIn} t={l}/>*/}
        </div>);
    }
}

export default App;
// export class mainLayout{}
