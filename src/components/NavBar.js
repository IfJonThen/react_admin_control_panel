import React, { Component } from 'react';
import '../static/css/NavBar.css';
import {Nav,NavDropdown,MenuItem,NavItem} from 'react-bootstrap';
import {Router, browserHistory} from 'react-router';
import {Grid} from 'react-bootstrap';
import MainView from './MainView';
import SplitView from './SplitView';
import DropdownSection, {Section} from './DropdownSection';
import {Button} from './ButtonGroup';
import RosterView from './RosterView';
var members={'Name':'Jon,Max,Gary'};

var memInfo= {'Gary':{},'Jon':{},'Max':{} };
/*eslint no-unused-vars: "off", default-case: "off"*/

class NavBar extends React.Component{
    constructor(props){
        super(props);
        this.handleNavClick=this.handleNavClick.bind(this);
        if(props.loc===undefined){
            console.log("NavBar():constructor LOC IS UNDEFINED");
        }
        this.state={loc:props.loc};
    }
    handleNavClick(event){
        event.preventDefault();
        console.log('NavBar::selected '+event.target.id);
        switch(event.target.id){
            case "nav1":
                this.props.handleClick("home");
                break;
            case "nav2":
                this.props.handleClick("roster");
                break;
            case "nav3":
                this.props.handleClick("database");
                //go to database;
                break;
            case "nav4":
                this.props.handleClick("classes");
                break;
            case "nav5":
                break;
            case "nav5.3":
                break;
            default:
                break;
        }
    }
    componentWillMount(){
        console.log("waiting");
    }
    render(){
        let baseView = null;
        return(
            <div className="NavBar">
                {/*<div className="row">*/}
                <Button id="nav1" onClick={this.handleNavClick}cname="navbtn" value="Home"/>
                <Button id="nav2"onClick={this.handleNavClick}cname="navbtn"value="Roster"/>
                <Button id="nav3"onClick={this.handleNavClick}cname="navbtn inactivebtn"value="Database"/>
                <Button id="nav4"onClick={this.handleNavClick} cname="navbtn inactivebtn"value="Classes"/>
                <div className="dropdown">
                    <Button id="nav5"cname="navbtn dropbtn"value="Dropdown"/>
                    <div className="dropdown-content">
                        <Button id="nav5.1"cname="ddbtn"value="placeholder"/>
                        <Button id="nav5.2"cname="ddbtn"value="placeholder"/>
                        <Button id="nav5.3"cname="ddbtn"value="LogOut"/>
                    </div>
                </div>
                {baseView}
            </div>
        );
    }
}


export default NavBar;
