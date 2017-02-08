import React, { Component } from 'react';
import logo from '../logo.svg';
import '../static/css/App.css';
import NavExample from './Nav';
import {Grid} from 'react-bootstrap';
import {Link} from 'react-router';
// import LogInForm from './LogInForm/LogInForm';
import LogInControl from './LogInControl';
/*eslint no-unused-vars: "off"*/

class App extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:false};
        this.handleLogInChange=this.handleLogInChange.bind(this);
        console.log("App.js: state.isLoggedIn:"+this.state.isLoggedIn);
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
        console.log("App.js render(): state.isLoggedIn:"+this.state.isLoggedIn);
        var v =null;
        if(this.state.isLoggedIn) {
             v = (<div><NavExample/><Grid fluid={true}>{this.props.children}</Grid></div>);
        }
        else{
             v = <LogInControl onClick={this.handleLogInChange} isLoggedin={this.state.isLoggedIn} t={this.props.children}/>
        }

                return (<div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome</h2>
                            </div>
                        {v}
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
