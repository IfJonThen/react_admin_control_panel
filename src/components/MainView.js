import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Grid} from 'react-bootstrap';
import DropdownSection from './DropdownSection';
import TableView from './TableView';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];
import {Button} from './ButtonGroup';
import MainSquares from './MainSquares';
/*eslint no-unused-vars: "off"*/

class MainView extends Component{
    constructor(){
        super();
        this.classupdate=this.classupdate.bind(this);
        this.rosterupdate=this.rosterupdate.bind(this);
        this.calupdate=this.calupdate.bind(this);
    }
    classupdate(){
        this.setState({loc:"class"});
        // browserHistory.push('home');
    }
    rosterupdate(){
        this.setState({loc:"roster"});
        // browserHistory.push('home');
    }
    calupdate(){
        this.setState({loc:"roster"});
        // browserHistory.push('home');

    }

    render() {
        let v = (<Grid fluid={true}>
            <div className="MainSquare">
                <Button onClick={this.rosterupdate} className="squares"id="rosterupdate" value="Roster Update"/>
                <Button onClick={this.classupdate} className="squares" id="classupdate" value="Class Update"/>
                <Button onClick={this.calupdate} className="squares" id="calupdate" value="Calendar Update"/>
            </div>
        </Grid>);

       return (<div className="mainView">{v}

       </div>);
    }
}

export default MainView;
