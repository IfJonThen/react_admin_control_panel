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
class RosterForm extends Component{

    /*RosterForm::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        // this.count=props.count;
        this.state={count:this.props.count};
        this.onButtonClick= this.onButtonClick.bind(this);
        this.addToDB=this.addToDB.bind(this);
        console.log("RosterForm::constructor::props.count " +props.count);
    }

    /* RosterForm()::onButtonClick()
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

    /*RosterForm()::addToDB()
    * helper function. takes arguments and places them into firebase
    * sends an Alert(for now upon success)
    * */
    addToDB(fname,lname,quarter,year){
        // console.log("RosterForm add "+ this.count);
        let t = {};
        if (this.state.base!==undefined) {
            t= {first:fname,last:lname,quarter:quarter,year:year};
            this.setState({base:this.state.base.concat([t])});
            // this.state.base.concat()[]
            // fbase.update('users', {s
            //     data: t,
            //     then(err){
            //         if (!err) {
            //             alert("RosterForm:buttonHandler: successfully added " + fname)
            //         } else{
            //             alert("Error " + err);
            //         }
            //     }
            // });
        }
    }
    componentWillMount(){
        // console.log("RosterForm::componentWillMount()");
        let t = {};
        if(this.state.base!==undefined) {
            // this.setState({count:this.state.base.length});
        }
    }
    componentDidMount() {
        // console.log("RosterForm::componentDidMount()::");
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
        return(<div className="splitform"><Form id="rosterform">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">First Name</label>
                    <div className="col-sm-6">
                        <input type="name" className="form-control" id="inputFname" placeholder={t}>
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
        this.handleRefreshBtn=this.handleRefreshBtn.bind(this);
        this.handleRemoveBtn=this.handleRemoveBtn.bind(this);
        this.pullList = this.pullList.bind(this)
    }
    fetchData(){
        fbase.fetch('users', {context:this,asArray:true,
            then(data){
                if (this.state.count!==data.length){
                    this.setState({base:data,count:data.length});
                    this.count=data.length;
                    console.log("RosterEdit::fetch:: count changed successfully");
                }
                else{
                    console.log("RosterEdit::fetch::count changed unsuccesfully");
                }
                console.log("RosterEdit:: fetched data success " + data + data.length +this.state.count);

            }});
    }
    handleRemoveBtn(event){
        event.preventDefault();
        // let t = document.getElementById("selectRemove");
        // console.log("RosterEdit::handleRemove::"+t.options[t]);
        let v = document.getElementById("selectRemove");
        v=v.options[v.selectedIndex].text;
        console.log("RosterEdit::handleRemoveBtn::triggered :" +v +" will be removed");
    }
    handleRefreshBtn(event){
        event.preventDefault();
        console.log("RosterEdit::handleRefresh::refreshing...");
        setTimeout(this.pullList(),500);
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
            for (let j = 0; j < this.state.count; j++) {
                if (typeof this.state.base[j] === 'string') {
                    v = document.createElement("option");
                    if((this.state.base[j]['first']&& this.state.base[j]['last'])!==(null||undefined)) {
                        v.appendChild(document.createTextNode(this.state.base[j]['first'] + this.state.base[j]['last']));
                        v.value = j + 1;
                        t.appendChild(v);
                    }
                }
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
        // this.pullList();
    }
    componentWillUpdate(){
        console.log("RosterEdit will update()");
        // this.pullList();

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
