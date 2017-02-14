import React, { Component } from 'react';
import {Nav,NavDropdown,MenuItem,NavItem} from 'react-bootstrap';
import {Router, browserHistory} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
var members={'Name':'Jon,Max,Gary'};
import MainView from './MainView';
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
/*eslint no-unused-vars: "off", default-case: "off"*/

class NavExample extends React.Component{
    constructor(props){
        super(props);
        this.handleSelect=this.handleSelect.bind(this);
        if(props.loc===undefined){
            console.log("NavExample():constructor LOC IS UNDEFINED");
        }
        this.state={loc:props.loc};
    }
    handleSelect(eventKey){
        event.preventDefault();
        console.log('NavExample::selected '+eventKey.text);
        switch(eventKey){
            case 1:
                this.setState({loc:'home'});
                browserHistory.push('home');
                break;
            case 2:
                this.setState({loc:'roster'});
                browserHistory.push('roster');
                break;
            case 3:
                //go to database;
                break;
            case 4:
                //go to compare pane;
                break;
            case 5.1:
                this.setState({isLoggedIn:false});

        }
    }
    render(){
        return(
            <div>
            <Nav bsStyle="tabs" activeKey="1" onSelect={this.handleSelect}>
                {/*<LinkContainer to="/home">*/}
                 <NavItem eventKey="1"> Home </NavItem>
                {/*</LinkContainer>*/}
                {/*<LinkContainer to="/roster">*/}
                <NavItem eventKey="2"> Roster </NavItem>
                {/*</LinkContainer>*/}
                {/*<LinkContainer to="database">*/}
                <NavItem eventKey="3" disabled> Database </NavItem>
                {/*</LinkContainer>*/}
                {/*<LinkContainer to="/compare">*/}
                 <NavItem eventKey="4" disabled> Compare </NavItem>
                {/*</LinkContainer>*/}
                 <NavDropdown eventKey="5" title="Settings" id="nav-dropdown">
                     <MenuItem eventKey="5.1">database</MenuItem>
                    <MenuItem eventKey="5.1">roster</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey="5.1">Log out</MenuItem>
                </NavDropdown>

            </Nav>
            </div>
        )
    }
}


export default NavExample;
