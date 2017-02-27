import React, { Component } from 'react';
import NavExample from "./Nav";
import {Form, Grid} from 'react-bootstrap';
import '../static/css/MainView.css';

import SplitView from './SplitView';
import TableView from './TableView';
import {Button} from './ButtonGroup';
import RosterForm,{RosterEdit} from './RosterForm';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];

import {base} from "../static/js/firebaseRef";
/*eslint no-unused-vars: "off"*/


class AttendanceView extends Component{

    /*AttendanceView()::constructor()
    * bind the functions..thanks es6 -_-
    * set states to default (empty or 0)
    * calls pullDB() to fill states. will most likely change to re-base.syncState in the future
     *  */
    constructor(){
      super();
      this.count=0;
      this.state={pane:"add",count:0,base:[]};

        this.handleSelectA=this.handleSelectA.bind(this);
        this.handleSelectR=this.handleSelectR.bind(this);
        this.onChange=this.onChange.bind(this)
        // this.pullList=this.pullList.bind(this);
        this.pullList2=this.pullList2.bind(this);
        this.pullDB=this.pullDB.bind(this);
        this.loadSections=this.loadSections.bind(this);
        this.pullDB();
    }
    componentDidMount(){
        // console.log("AttendanceView::componentDidMount()::");
        // var firebaseRef = firebase.database().ref("Names");
        base.syncState("users",{
            context:this,
            state:'base',
            asArray:true
        });

    }
    componentWillReceiveProps(){
        // console.log("AttendanceView::ComponentWillReceiveProps  ");
    }
    componentWillUnMount(){

    }
    /*AttendanceView()::pullDB()
    * pulls data from database via re-base.fetch()
    * sets "base" state and "count" state
    * may change to syncState
    *  */
    pullDB(){
        base.fetch('users', {
            context: this, asArray: true,
        }).then(data=>
        {
            this.count=data.length;
            // console.log("AttendanceView::pullDB():: data contains " + ((data)=>{if (data !== null){return "data";}}));
            this.setState({base:data,count:this.count});
        }).catch(error=>{
            console.log("AttendanceView:constructor: fetch error");
        });
        console.log("AttendanceView::constructor::this.state.count " + this.state.count);
    }

    /*AttendanceView()::loadSections()
    * helper function
    * makes a call to pullList, may remove in the future
     */
    loadSections(){
        this.pullList();
    }
    /*AttendanceView()::onChange()
     * helper function for Rosterform to generate children for props
     * makes a call to pullDB, may remove in the future
     */
    onChange(){
        if (this.state.count===undefined){
            this.pullDB();
            return this.state.count;
        }
        else{
            return this.state.count;
        }
    }

    /*AttendanceView()::handleSelectR()
     * handler function for the Remove Button
     * changes state to "remove"
     * */
    handleSelectR(event){
        // console.log('AttendanceView::handleSelectRemove() clicked');
        this.setState({pane:"remove"});
        // this.pullList();
    }

    /*AttendanceView()::handleSelectA()
     * handler function for the AddButton
     * changes state to "add"
     * */
    handleSelectA(){
        this.setState({pane:"add"});
    }

    /*AttendanceView()::pullList() Not in Use
     * generates textNodes for RosterEdit select form based on the number of children in state.base
     * */
    // pullList(){
    //     let v = null;
    //     var t =document.getElementById("selectRemove");
    //     console.log("AttendanceView::pullList:: this.state.base:" +this.state.base);
    //     if (t !=null) {
    //         for (let j = 0; j < this.state.count; j++) {
    //             if (typeof this.state.base[j] !== 'string') {
    //                 v = document.createElement("option");
    //                 if((this.state.base[j]['first']&& this.state.base[j]['last'])!==(null||undefined)) {
    //                     v.appendChild(document.createTextNode(this.state.base[j]['first'] + this.state.base[j]['last']));
    //                     v.value = j + 1;
    //                     t.appendChild(v);
    //                 }
    //                 else{
    //                     console.log("AttendanceView::pullList()...no children added");
    //                 }
    //             }
    //         }
    //     }
    //     console.log("RosterForm: pullList: added "+this.state.count +" options");
    // }

    /*
    * RosterEdit()::pullList2
    * generates children for RosterEdit select form based on the number of children in state.base
    *
    * */
    pullList2(){
        let v = [];
        var t =document.getElementById("selectRemove");
        // console.log("AttendanceView::pullList2:: this.state.base:" +this.state.base);
        for(let j =0; j<this.state.count;j++){
            if((this.state.base[j]['first']&& this.state.base[j]['last'])!==(null||undefined)) {
                if (typeof this.state.base[j] !== 'string') {
                    let l = this.state.base[j]['first']+ " "+ this.state.base[j]['last'] +' - '+ this.state.base[j]['quarter']+" "+this.state.base[j]['year'];

                    v.push(<option key={j}>{l}</option>);
                }
                else{
                    console.log("AttendanceView::pullList()...no children added");
                }
            }
        }
        // console.log("RosterForm: pullList2: added "+v+" options");

        return v;
    }

    /*AttendanceView()::Render()
     * renders the attendance forms
      *
      *
     */
    render() {
        let left =
            <div className="AttendPane">
                <div className="row">
                    <div className="col-sm-6">
                        <div className="form-control" selected="Quarter"id="selectQuarterAttend">
                            {this.props.quarter}
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="form-control" selected="Week" id="selectWeekAttend">
                            {this.props.week}
                        </div>
                    </div>
                </div>
                <Button cname="attendbtn" onClick={this.handleSelectR}id="viewAttendButton" value="View"/>

                <div className"AttendanceForm" id="insertAttendanceHere">

                </div>
            </div>;
        let right =null;

        if (this.state.pane==="add"){
            let count= this.onChange();
            right= <RosterForm count={count}/>;
        }
        else{
            let v = this.pullList2();
            right=<RosterEdit right={v} count={this.state.count}/>;
        }

        return (
            <div>
                <SplitPane pane={this.state.pane} left={left} right={right}>
                    </SplitPane>
                    </div>
            );

    }
}
AttendanceView.propTypes={
    count:React.PropTypes.number
};
AttendanceView.defaultProps={
    count:0
};
function SplitPane(props){
    return(<div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right">
            {props.right}
        </div>

    </div>);
}

export default AttendanceView;
