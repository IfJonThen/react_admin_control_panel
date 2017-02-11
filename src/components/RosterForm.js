import React, {Component } from 'react';
import '../static/css/RosterView.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import members from '../data/database';
import {Button} from './ButtonGroup';
import ReactFireMixin from 'reactfire';
import ReactDOM from 'react-dom';
import Rebase from 're-base';
/*eslint no-unused-vars: "off"*/
import {firebaseAuth} from '../static/js/firebaseAuth';
// import base from '../static/js/firebaseAuth';
// import * as firebase from 'firebase';
var base = Rebase.createClass({
    apiKey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
    authDomain:"classexaminer.firebaseapp.com",
    databaseURL:"https://classexaminer.firebaseio.com",
    storageBucket:"classexaminer.appspot.com",
    messagingSenderId:"150507520756"
});

class RosterForm extends Component{
    constructor(props){
        super(props);
        console.log("RosterForm::constructor::props.count " +props.count);
    }
    onButtonClick(event){
        event.preventDefault();

        console.log("add button clicked");
        let fname = document.getElementById("inputFname");
        let lname = document.getElementById("inputLname");
        fname = fname.value;
        lname= lname.value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;
        console.log("adding member", fname+ " " + lname+" "+quarter  + " "+ year);
        //change this to push
        // base.update('classes',{
        //     data:{uid: {"jyuen":{f2k16:['CS 161','Informatics 133','Informatics 124']}}},
        //     then(err){
        //         if(!err){
        //             alert("successfully added "+ fname)
        //             // Router.transitionTo('')
        //         }
        //     }
        // });
        let t = {};
        t[this.count]=fname;
        base.update('users',{
            data:t,
            then(err){
                if(!err){
                    alert("RosterForm:buttonHandler: successfully added "+ fname)
                    // Router.transitionTo('')
                }
            }
        });
    }
    componentDidMount() {
        // var firebaseRef = firebase.database().ref("Names");
        // this.syncState("Names",{
        //     context:this,
        //     state:'names',
        //     asArray:true
        // });
    }

    render(){
        return(<div className="splitform"><Form id="rosterform">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">First Name</label>
                    <div className="col-sm-6">
                        <input type="name" className="form-control" id="inputFname" placeholder="First Name">
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-6">
                        <input type="name" className="form-control" id="inputLname" placeholder="Last Name">
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Pledge Class</label>
                    <div className="col-sm-6">
                        <select className="form-control" id="selectPledgeYear">
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Year</label>
                    <div className="col-sm-6">
                        <input type="name" className="form-control" id="inputYear" placeholder="Year">
                        </input>
                    </div>
                </div>
                <Button onClick={this.onButtonClick} id="insertmemberbtn" value="Add">Add</Button>
            </Form>
            </div>

        );
    }
}
export class RosterEdit extends Component{
    constructor(props) {
        super(props);
        this.state = {users: [],base:[],count:props.count};
        this.fetchData = this.fetchData.bind(this);
        this.fetchData();
        this.count = props.count;
        this.handleRefresh=this.handleRefresh.bind(this);
        this.handleRemoveBtn=this.handleRemoveBtn.bind(this);
        this.pullList = this.pullList.bind(this)
    }
    fetchData(){
        base.fetch('users', {context:this,asArray:true,
            then(data){
                if (this.state.count!==data.length){
                    this.setState({base:data,count:data.length});
                    this.count=data.length;
                    console.log("RosterEdit::fetch:: count changed successfully");
                    // this.pullList();

                }
                else{
                    console.log("RosterEdit::fetch::count changed unsuccesfully");
                    // this.pullList();

                }
                console.log("RosterEdit:: fetched data success " + data + data.length +this.state.count);

            }});
    }
    handleRemoveBtn(){
        let v = document.getElementById("selectRemove");
        v=v.options[v.selectedIndex].text;
        console.log("RosterEdit::handleRemoveBtn::triggered :" +v +"will be removed");
    }
    handleRefresh(){
        console.log("RosterEdit::handleRefresh::refreshing...");
        setTimeout(this.pullList(),500);
        // let v = document.getElementById("selectRemove");
        // v=v.options[v.selectedIndex].text;
        // console.log("RosterEdit::handleRemoveBtn::triggered :" +v +"will be removed");
    }
    createUID(fname,lname){
        if(fname.length!==0 &&lname.length!==0) {
            return fname[0]+lname;
        }
    }
    pullList(){
        let v = null;
        var t =document.getElementById("selectRemove");
        console.log("RosterEdit: pullList: adding "+this.state.count +" options");
        for(let j =0; j<this.state.count;j++){
            if(typeof this.state.base[j]=== 'string') {
                v = document.createElement("option");
                v.appendChild(document.createTextNode(this.state.base[j]));
                v.value = j + 1;
                t.appendChild(v);
            }
        }
        console.log("RosterEdit: pullList: added "+this.state.count +" options");
    }
    componentDidMount(){
        console.log("RosterEdit did mount()");
        // this.pullList();

    }
    componentWillMount(){
        console.log("RosterEdit will mount()");
        this.pullList();
    }
    componentWillUpdate(){
        this.pullList();

        if(this.count!==0){
            // console.log("RosterEditWillUpdate : "+this.fetchData());
        }
        else{
            console.log("database is empty");

        }
    }
    render(){
        return (
            <div className="splitform">
                <Form>
                    <div className="form-group">
                    <label id="editFormLabel">Remove Member</label>
                    <select className="form-control" id="selectRemove">
                        {this.props.right}
                    </select>
                        <Button onClick={this.handleRemoveBtn} id="removebtn" value="Remove"/>
                        <Button onClick={this.handleRefreshBtn} id="refreshbtn" value="Refresh"/>

                    </div>

                </Form>
            </div>
        );

    }
}
export default RosterForm;
