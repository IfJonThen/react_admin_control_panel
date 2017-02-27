import React, {Component } from 'react';
import '../static/css/RosterView.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import * as firebase from 'firebase';
import {Button} from './ButtonGroup';
import ReactFireMixin from 'reactfire';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
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
        this.state={count:this.props.count};
        this.onButtonClick= this.onButtonClick.bind(this);
        this.addToDB=this.addToDB.bind(this);
        console.log("AttendanceForm::constructor::props.count " +props.count);
    }

    /* AttendanceForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onButtonClick(event){
        event.preventDefault();
        let fname = document.getElementById("inputFname").value;
        let lname = document.getElementById("inputLname").value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;

        this.addToDB(fname,lname,quarter,year);
        // base.update('classes',{
        //     data:{uid: {"jyuen":{f2k16:['CS 161','Informatics 133','Informatics 124']}}},
        //     then(err){
        //         if(!err){
        //             alert("successfully added "+ fname)
        //             // Router.transitionTo('')
        //         }
        //     }
        // });
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
            // this.state.base.concat()[]
            // fbase.update('users', {s
            //     data: t,
            //     then(err){
            //         if (!err) {
            //             alert("AttendanceForm:buttonHandler: successfully added " + fname)
            //         } else{
            //             alert("Error " + err);
            //         }
            //     }
            // });
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
        let t="First Name";

        if (this.state.count===0 || this.state.count===null){
            // t="KEYERROR"+this.state.count;
        }
        else{
            t="First Name";
        }
        return(
            <div className="attendSquares">
                <Form id="AttendanceForm">
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">{this.props.quarter}</label>
                        <label className="col-sm-2 col-form-label">{this.props.week}</label>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">On Time</label>
                        <div className="col-sm-6" id="OnTime">
                        </div>
                    </div>
                    <div className="form-group row">
                        <label  className="col-sm-2 col-form-label">Late</label>
                        <div className="col-sm-6" id="Late">
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Absent</label>
                        <div className="col-sm-6" id="Late">
                        </div>
                        <Button onClick={this.onButtonClick} id="insertmemberbtn" value="Add">Add</Button>
                    </div>
                </Form>
            </div>

        );
    }
}

export default AttendanceForm;
