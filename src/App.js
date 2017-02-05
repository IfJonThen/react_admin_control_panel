import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NavExample from './Nav/Nav';
import {Grid,FormGroup,ControlLabel,FormControl,HelpBlock} from 'react-bootstrap';
import {Router,Route,Link} from 'react-router';
import LogInForm from './LogInForm/LogInForm';
/* eslint-disable */
class App extends Component {
    render() {
                return (<div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome</h2>
                            </div>

                <Greeting isLoggedIn={false} t={this.props.children}/>


            </div>
        );
    }
}
function Greeting(props){
    const isLoggedIn = props.isLoggedIn;
    if(isLoggedIn){
        return (<div>
            <NavExample/>
            <Grid fluid={true}>
                {props.t}
            </Grid>
            </div>
        );
        // return (props.t);
    }
    else{
        return (<div>
            <h2>Please Log In.</h2>
            <LogInForm/>
        </div>);
    }
}

export default App;
// export class mainLayout{}
