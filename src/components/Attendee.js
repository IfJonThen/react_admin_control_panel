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
class Attendee extends Component{

    /*Attendee::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        this.bump=this.bump.bind(this);
        this.state={tally:props.tally};
        // console.log('Attendee::: this.props.week '+ props.tally);
        this.getName=this.getName.bind(this);
        this.onButtonClick= this.onButtonClick.bind(this);
    }
    bump(){
        if (this.state.tally>=1){
            return -1;
        }
        else{
            return (this.state.tally+1);
        }
    }

    /* Attendee()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    onButtonClick(event){
        event.preventDefault();
        console.log(this.props.name + " " +this.state.tally);
        let tally=this.state.tally;
        if (this.state.tally>=1){
            tally=-1;
        }
        else{
            tally+=1;
        }
        this.props.clickButton(this.props.val,tally);
        this.setState({tally:tally});
    }

    /*Attendee()::addToDB()
    * helper function. takes arguments and places them into firebase
    * sends an Alert(for now upon success)
    * */
    addToDB(fname,lname,quarter,year){
        let t = {};
        if (this.state.base!==undefined) {
            t= {first:fname,last:lname,quarter:quarter,year:year};
            this.setState({base:this.state.base.concat([t])});

        }
    }
    getName(){
        return this.props.name;
    }
    componentDidMount() {
        this.setState({tally:this.props.tally});
    }
    render(){
        let t= "attendanceBtn";
        switch(this.state.tally){
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
            <div className="attendSquares" data-tally={this.state.tally}>
                <Button cname={t} onClick={this.onButtonClick} value={this.props.week+" " +this.props.name +" "+ this.props.tally + " "+ this.state.tally}></Button>
            </div>

        );
    }
}

export default Attendee;
