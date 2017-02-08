import React, { Component } from 'react';
import {Nav,NavDropdown,MenuItem,NavItem} from 'react-bootstrap';
import {Router, browserHistory} from 'react-router';
var members={'Name':'Jon,Max,Gary'};

var memInfo= {'Gary':{},'Jon':{},'Max':{} };
/*eslint no-unused-vars: "off"*/

const NavExample = React.createClass({
    handleSelect(eventKey){
        event.preventDefault();
        console.log('selected '+eventKey);
        switch(eventKey){
            case 1:
                //go to home;
                break;
            case 2:
                browserHistory.push('roster');
                break;
            case 3:
                //go to database;
                break;
            case 4:
                //go to compare pane;
                break;

        }
    },
    render(){
        return(
            <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                 <NavItem eventKey="1" href="/home"> Home </NavItem>
                 <NavItem eventKey="2" href="/roster"> Roster </NavItem>
                 <NavItem eventKey="3" href="/database" disabled> Database </NavItem>
                 <NavItem eventKey="4" href="/compare" disabled> Compare </NavItem>
                 <NavDropdown eventKey="5" title="Settings" id="nav-dropdown">
                     <MenuItem eventKey="5.1">database</MenuItem>
                    <MenuItem eventKey="5.1">roster</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey="5.1">Log out</MenuItem>
                </NavDropdown>

            </Nav>

        )
    }
});


export default NavExample;
