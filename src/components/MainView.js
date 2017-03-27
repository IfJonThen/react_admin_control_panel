import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Grid} from 'react-bootstrap';
import DropdownSection from './DropdownSection';
import TableView from './TableView';
import AttendanceForm from './AttendanceForm';
import {base} from '../static/js/firebaseRef';
import {Button} from './ButtonGroup';
import {getUID,getQuarter} from '../static/js/functions';
/*eslint no-unused-vars: "off"*/

class MainView extends Component{
    constructor(props){
        super(props);
        this.state={currentWeek:null,nav:props.nv, memList:[]};
        this.AttendanceUpdate=this.AttendanceUpdate.bind(this);
        this.rosterUpdate=this.rosterUpdate.bind(this);
        this.calUpdate=this.calUpdate.bind(this);
        this.helperFetch=this.helperFetch.bind(this);
        this.parseAlumni=this.parseAlumni.bind(this);
        this.helperFetch("users");
        this.redraw=this.redraw.bind(this);
        this.currentWeek = null;
        this.redraw();
    }
    redraw(){
        console.log("calling redraw");
        // this.setState({currentWeek: 1});
        base.fetch("Attendance/Quarter/"+getQuarter(), {
                    context: this, asArray: true,
                }).then(data=>
                {
                    // console.log("this is data "+ data);
                    this.setState({currentWeek:data});
                }).catch(error=>{
                    console.log("MainView::getCurrentWeek():: fetch error");
                });
    }
    parseAlumni(){
        let sortMem={"uid":[],"undergrad":[]};
        for (let i =0; i<this.state.memList.length;i++){
            let currentMember=this.state.memList[i];
            let j =(currentMember["first"] + " " +currentMember["last"]);
            if (!currentMember["graduated"]) {
                sortMem["uid"].push(getUID(currentMember));
                sortMem["undergrad"].push(j);
            }
        }
        return sortMem;
    }
    componentDidMount(){
        console.log("get CurrentWeek");
        base.syncState(`Attendance/Quarter/`+getQuarter(), {
            context: this,
            state: 'currentWeek',
            asArray: true
        });
        this.redraw();
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

    classUpdate(){
        this.setState({loc:"class"});
        // browserHistory.push('home');
    }
    rosterUpdate(){
        this.setState({loc:"roster"});
        // browserHistory.push('home');
    }
    calUpdate(){
        this.setState({loc:"roster"});
        // browserHistory.push('home');
    }
    AttendanceUpdate(){
        this.setState({nav:"attendance"});
        this.props.handleClick("home");
    }
    render() {
        let main= null;
        switch(this.state.nav){
            case undefined:
                main=<div className="mainSquare">
                    <Button onClick={this.AttendanceUpdate} cname="squares"id="attendanceupdate" value="Attendance"/>
                    <Button onClick={this.classUpdate} cname="squares" id="classupdate" value="Class Update"/>
                    <Button onClick={this.calUpdate} cname="squares" id="calupdate" value="Calendar Update"/>
                </div>;
                break;
            case "attendance":

                let memList=this.parseAlumni();
                // this.currentWeek=this.getCurrentWeek();
                let t = null;let week=[{},{}];
                if (this.state.currentWeek!==(null || undefined)){
                    week=this.state.currentWeek;
                }
                // console.log("week is\n "+week+"\n\n\n"+JSON.stringify(week));
                main=<AttendanceForm redraw={this.redraw} tallyTree={t}currentWeek={week} memId={memList["uid"]} members={memList["undergrad"]}/>;
                break;
            case "calendar":
                main=<div> code for calendar</div>;
                break;
            default:
                main=<div style={{backgroundColor:"rgba(0,0,0,0.5)"}}>
                    <Button onClick={this.AttendanceUpdate} cname="squares"id="attendanceupdate" value="Attendance"/>
                    <Button onClick={this.classUpdate} cname="squares" id="classupdate" value="Class Update"/>
                    <Button onClick={this.calUpdate} cname="squares" id="calupdate" value="Calendar Update"/>
                </div>
                break;
        }
       return (<div className="mainView">
           {/*<Grid fluid={true}>*/}
               <div className="MainSquare">
                   {main}
               </div>
           {/*</Grid>*/}
       </div>);
    }
}

export default MainView;
