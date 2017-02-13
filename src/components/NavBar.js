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
        this.handleSelect=this.handleSelect.bind(this);
        if(props.loc===undefined){
            console.log("NavBar():constructor LOC IS UNDEFINED");
        }
        this.state={loc:props.loc};
    }
    handleSelect(eventKey){
        event.preventDefault();
        console.log('NavBar::selected '+eventKey);
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
            default:
                break;
        }
    }
    componentWillMount(){
        console.log("waiting");
    }
    render(){
        let baseView = null;
        if (this.state.loc === undefined){
            {/*baseView= <MainView/>;*/}


        }
        else if (this.state.loc==="roster"){
            var s = <Button id="AddM" value="Add Member"> why</Button>;
            var t=(<DropdownSection/>);
            baseView=<RosterView db={this.props.db}/>;
            //show roster
        }
        else if (this.state.loc==="home"){
            {/*baseView= <MainView/>;*/}

        }
        return(
            <div className="NavBar">
                {/*<div className="row">*/}
                <Button cname="navbtn" value="Home"/>
                <Button cname="navbtn"value="Roster"/>
                <Button cname="navbtn"value="Database"/>
                <Button cname="navbtn"value="Classes"/>
                <Button cname="navbtn"value="Dropdown"/>
                {baseView}
                 {/*</div>*/}
            </div>
        );
    }
}


export default NavBar;
