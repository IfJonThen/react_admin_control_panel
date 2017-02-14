import React, { Component } from 'react';
import '../static/css/App.css';
import NavExample from './Nav';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {Grid} from 'react-bootstrap';
import SplitView from './SplitView';
import DropdownSection, {Section} from './DropdownSection';
import {Button} from './ButtonGroup';
import RosterView from './RosterView';
import LogInControl from './LogInControl';
import {login,logout} from '../static/js/firebaseAuth';
/*eslint no-unused-vars: "off"*/

class MainSquares extends React.Component {
    constructor(){
        super();
        this.state={isLoggedIn:true};
        this.handleLogInChange=this.handleLogInChange.bind(this);
    }

    handleLogInChange(e){
        console.log("MainSquares.js: handleLogInChange() before state:"+e);
        this.setState({isLoggedIn:e},()=>{
            setTimeout(()=>{
                console.log("MainSquares.js: handleLogInChange() after state:"+this.state.isLoggedIn)
            },500);
        });

    }
    render() {
            return null;
    }
}

export default MainSquares;
// export class mainLayout{}
