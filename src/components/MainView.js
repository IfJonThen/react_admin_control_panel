import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Grid} from 'react-bootstrap';
import DropdownSection from './DropdownSection';
import TableView from './TableView';
import AttendanceForm from './AttendanceForm';
import {base} from '../static/js/firebaseRef';
import {Button} from './ButtonGroup';
import MainSquares from './MainSquares';
/*eslint no-unused-vars: "off"*/

class MainView extends Component{
    constructor(props){
        super(props);
        this.state={nav:props.nv, memList:[]};
        this.AttendanceUpdate=this.AttendanceUpdate.bind(this);
        this.rosterupdate=this.rosterupdate.bind(this);
        this.calupdate=this.calupdate.bind(this);
        this.helperFetch=this.helperFetch.bind(this);
        this.helperFetch("users");

    }

    helperFetch(db){
        base.fetch(db, {
            context: this, asArray: true,
        }).then(data=>
        {
            this.count=data.length;
            this.setState({memList:data});
        }).catch(error=>{
            console.log("MainView::helperFetch:: fetch error");
        });
        console.log("MainView::helperFetch::memList"+ this.state.memList);


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
                main=<div className="mainSquare">
                    <Button onClick={this.AttendanceUpdate} className="squares"id="attendanceupdate" value="Attendance"/>
                    <Button onClick={this.classupdate} className="squares" id="classupdate" value="Class Update"/>
                    <Button onClick={this.calupdate} className="squares" id="calupdate" value="Calendar Update"/>
                </div>;
                break;
            case "attendance":
                //to do attendance view
                main=<AttendanceForm members={this.state.memList}></AttendanceForm>;
                break;
            case "calendar":
                main=<div> code for calendar</div>;
                //to Do calendarView
                break;
            default:
                main=<div style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
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
