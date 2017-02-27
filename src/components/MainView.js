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
    constructor(props){
        super(props);
        this.state={nav:props.nv};
        this.AttendanceUpdate=this.AttendanceUpdate.bind(this);
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
    AttendanceUpdate(){
        this.setState({nav:"attendance"});
        this.props.handleClick("home");

    }
    render() {
        let main= null;
        console.log("MainView()::render()"+ this.state.nav);
        switch(this.state.nav){
            case undefined:
                main=<div className="MainSquare">
                    <Button onClick={this.AttendanceUpdate} className="squares"id="attendanceupdate" value="Attendance"/>
                    <Button onClick={this.classupdate} className="squares" id="classupdate" value="Class Update"/>
                    <Button onClick={this.calupdate} className="squares" id="calupdate" value="Calendar Update"/>
                </div>;
                break;
            case "attendance":
                //to do attendance view
                main=<div > code for attendance</div>;
                break;
            case "calendar":
                main=<div> code for calendar</div>;
                //to Do calendarView
                break;
            default:
                main=<div className="MainSquare">
                    <Button onClick={this.AttendanceUpdate} className="squares"id="attendanceupdate" value="Attendance"/>
                    <Button onClick={this.classupdate} className="squares" id="classupdate" value="Class Update"/>
                    <Button onClick={this.calupdate} className="squares" id="calupdate" value="Calendar Update"/>
                </div>
                break;
        }
       return (<div className="mainView">
           <Grid fluid={true}>
               <div className="MainSquare">
                   {main}
               </div>
           </Grid>
       </div>);
    }
}

export default MainView;
