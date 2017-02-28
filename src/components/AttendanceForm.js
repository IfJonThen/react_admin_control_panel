import React, {Component } from 'react';
import '../static/css/RosterView.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import Attendee from './Attendee';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
import {Button} from './ButtonGroup';
import {toDayte} from '../static/js/functions';
/*eslint no-unused-vars: "off"*/
import {firebaseAuth} from '../static/js/firebaseAuth';

//brings in the Rebase object
var fbase = Rebase.createClass({
    apiKey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
    messagingSenderId:"150507520756"
});
class AttendanceForm extends Component{

    /*AttendanceForm::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        // this.count=props.count;
        this.click=this.click.bind(this);
        this.state={count:this.props.count};
        this.onButtonClick= this.onButtonClick.bind(this);
        this.addToDB=this.addToDB.bind(this);
    }

    /* AttendanceForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    click(event){

    }
    onButtonClick(event){
        event.preventDefault();
        let fname = document.getElementById("inputFname").value;
        let lname = document.getElementById("inputLname").value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;
        // this.addToDB(fname,lname,quarter,year);
    }

    /*AttendanceForm()::addToDB()
    * helper function. takes arguments and places them into firebase
    * sends an Alert(for now upon success)
    * */
    addToDB(fname,lname,quarter,year){
        // console.log("AttendanceForm add "+ this.count);
        let t = {};
        if (this.state.base!==undefined) {
            t= {first:fname,last:lname,quarter:quarter,year:year};
            this.setState({base:this.state.base.concat([t])});
        }
    }
    componentWillMount(){
        // console.log("AttendanceForm::componentWillMount()");
        let t = {};
        if(this.state.base!==undefined) {
            // this.setState({count:this.state.base.length});
        }
    }
    componentDidMount() {
        // console.log("AttendanceForm::componentDidMount()::");
        // var firebaseRef = firebase.database().ref("Names");
        fbase.syncState("users",{
            context:this,
            state:'base',
            asArray:true
        });
    }

    render(){
        // let t=null;
        let t=[];
        let list_of_names = ["bhaas2013","gmachlis2014", "jlyuen2013","kshah2014"];
            let play_map={"bhaas2013":['Brandon Haas',3], "gmachlis2014":['Gary Machlis',2],
            "jlyuen2013":['Jonathan Yuen',1], "kshah2014":['Kevin Shah',0]};

        for (let i =0; i<this.props.members.length;i++){
            let j =(this.props.members[i]["first"] + " " +this.props.members[i]["last"]);
            // console.log(j);
            t.push(<Attendee key={i} clickButton={this.click} name={j}></Attendee>);
        }
        let k = toDayte();
        return(
            <div className="attendView">
                <div className="row">
                <h1 style={{color:"black"}}>{"Attendance"+" "}<span style={{color:"red"}}>{k}</span></h1>
                    {/*<p style={{color:"red",fontWeight:"bold"}}>{k}</p>*/}

                </div>
            <div className="row">
                <Button cname="saveButton"value="save"></Button>
            </div>
                <div className="attendForm">
                {t}
            </div>
            </div>

        );
    }
}

export default AttendanceForm;
