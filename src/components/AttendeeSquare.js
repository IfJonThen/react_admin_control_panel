import React, {Component } from 'react';
import '../static/css/Attendee.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import {Button} from './ButtonGroup';
import Rebase from 're-base';
/*eslint no-unused-vars: "off"*/
import * as funlib from '../static/js/functions';
import {base} from '../static/js/firebaseRef';
import {firebaseAuth} from '../static/js/firebaseAuth';

//brings in the Rebase object
var fbase = Rebase.createClass({
    apiKey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
    messagingSenderId:"150507520756"
});
class AttendeeSquare extends Component{

    /*Attendee::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        // console.log('Attendee::: this.props.week '+ props.tally);
        this.getName=this.getName.bind(this);
        this.onButtonClick= this.onButtonClick.bind(this);
    }
    /* Attendee()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onButtonClick(event){
        event.preventDefault();
        console.log(this.props.tally);
        let tally=this.props.tally;
        if (this.props.tally>=1){
            tally=-1;
        }
        else{
            tally+=1;
        }
        this.props.clickButton(this.props.val,tally);
        // this.setState({tally:tally});
    }

    getName(){
        return this.props.name;
    }
    render(){
        let t= "attendanceBtn";
        switch(this.props.tally){
            case -1:
                t+=' redBtn';
                break;
            case 0:
                t+=' yellowBtn';
                break;
            case 1:
                t+=" greenBtn";
                break;
            default:
                break;
        }

        return(
            <div className="attendSquares">
                <Button cname={t} onClick={this.onButtonClick} sv={this.props.total}value={this.props.name}/>
            </div>

        );
    }
}

export default AttendeeSquare;
