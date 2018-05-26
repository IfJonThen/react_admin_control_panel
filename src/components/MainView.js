import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Grid} from 'react-bootstrap';
import DropdownSection from './DropdownSection';
import TableView from './TableView';
import AttendanceForm from './AttendanceForm';
import {base} from '../static/js/firebaseRef';
import {Button} from './ButtonGroup';
import FormViewer from './View';
import {getUID,getQuarter} from '../static/js/functions';
/*eslint no-unused-vars: "off"*/

class MainView extends Component{
    constructor(props){
        super(props);
        this.state={currentWeek:null,nav:props.nv, memList:[]};
        this.helperFetch=this.helperFetch.bind(this);
        this.parseAlumni=this.parseAlumni.bind(this);
        this.helperFetch("users");
        this.redraw=this.redraw.bind(this);
        this.currentWeek = null;
        this.redraw();
        this.squareClick=this.squareClick.bind(this);
    }
    redraw(){
        base.fetch("Attendance/Quarter/"+getQuarter(), {
                    context: this, asArray: true,
                }).then(data=>
                {
                    this.setState({currentWeek:data});
                }).catch(error=>{
                    console.log("MainView::getCurrentWeek():: fetch error");
                });
    }
    parseAlumni(){
        let sortMem={"uid":[],"undergrad":[]};
        console.log("parse alumni pre sort list count ="+this.state.memList.length);
        for (let i =0; i<this.state.memList.length;i++){
            let currentMember=this.state.memList[i];

            let j =(currentMember["first"] + " " +currentMember["last"]);
            if (!currentMember["graduated"]) {
                sortMem["uid"].push(getUID(currentMember));
                sortMem["undergrad"].push(j);
            }
            else{
                // alert(currentMember["first"]);
            }
        }
        // alert(sortMem["uid"].length);
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

    squareClick(event){
        console.log(event.target.id);
        this.props.handleClick(event.target.id);
    }
    render() {
        let main= null;
        console.log("AppView::::"+this.props.nv);
        switch(this.props.nv){
            case undefined:
                main=<div className="mainSquare">
                    <Button onClick={this.squareClick} cname="squares"id="AttendanceBtn" value="Attendance"/>
                    <Button onClick={this.squareClick} cname="squares" id="FormsBtn" value="Class Update"/>
                    <Button onClick={this.squareClick} cname="squares" id="CalBtn" value="Calendar Update"/>
                </div>;
                break;

            case "AttendanceBtn":
                let memList=this.parseAlumni();
                let t = null;let week=[{},{}];
                if (this.state.currentWeek!==(null || undefined)){
                    week=this.state.currentWeek;
                }
                main=<AttendanceForm redraw={this.redraw} tallyTree={t}currentWeek={week} memId={memList["uid"]} members={memList["undergrad"]}/>;
                break;
            // case "FormsBtn":
            //     main=<canvas id="firstChart" width="600" height="400">
            //         <FormViewer/>
            //     </canvas>;
            //     break;
            case "CalBtn":
                main=<div> code for calendar</div>;
                break;
            default:
                main=(<div style={{backgroundColor:"rgba(25,25,25,0.5)"}}>
                    <Button onClick={this.squareClick} cname="squares" id="AttendanceBtn" value="Attendance"/>
                    <Button onClick={this.squareClick} cname="squares" id="FormsBtn" value="Forms"/>
                    <Button onClick={this.squareClick} cname="squares" id="CalBtn" value="Calendar Update"/>
                </div>);
                break;
            }
       return (<div className="mainView">
                        <div className="MainSquare">
                            {main}
                            </div></div>);
    }
}

export default MainView;
