import React, {Component } from 'react';
import '../static/css/RosterView.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import members from '../data/database';
import {Button} from './ButtonGroup';
import ReactFireMixin from 'reactfire';
import * as firebase from 'firebase';
import ReactDOM from 'react-dom';
/*eslint no-unused-vars: "off"*/
import {base,firebaseAuth} from '../static/js/auth';

// import * as firebase from 'firebase';

// var fb = Rebase.createClass({apikey: "AIzaSyDbA2-3W4c4a1Fdl9QPG_KHMJGIRSn_ORU",
//     authDomain:"classexaminer.firebaseapp.com",
//     databaseURL:"https://classexaminer.firebaseio.com",
//     storageBucket:"classexaminer.appspot.com",
// });
// var RosterForm = React.createClass({
//     mixins:[ReactFireMixin],
//     getInitialState: function() {
//         return {
//         };
//     },
//     onButtonClick(event){
//         event.preventDefault();
//         // this.firebaseRef.push({
//         //    text:this.state.text
//         // });
//         // this.setState({text:""});
//         console.log("add button clicked");
//         let fname = document.getElementById("inputFname");
//         let lname = document.getElementById("inputLname");
//         fname = fname.value;
//         lname= lname.value;
//         let quarter = document.getElementById("selectPledgeYear");
//         quarter = quarter.options[quarter.selectedIndex].text;
//         let year = document.getElementById("inputYear").value;
//         console.log("adding member", fname+ " " + lname+" "+quarter  + " "+ year);
//
//     },
//     componentWillMount: function() {
//         var firebaseRef = firebase.database().ref("Names");
//         this.bindAsArray(firebaseRef.limitToLast(25), "Names");
//     },
//     render(){
//         return(<div className="splitform"><Form id="rosterform">
//                 <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">First Name</label>
//                     <div className="col-sm-6">
//                         <input type="name" className="form-control" id="inputFname" placeholder="First Name">
//                         </input>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Last Name</label>
//                     <div className="col-sm-6">
//                         <input type="name" className="form-control" id="inputLname" placeholder="Last Name">
//                         </input>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <label  className="col-sm-2 col-form-label">Pledge Class</label>
//                     <div className="col-sm-6">
//                         <select className="form-control" id="selectPledgeYear">
//                             <option>Fall</option>
//                             <option>Winter</option>
//                             <option>Spring</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className="form-group row">
//                     <label className="col-sm-2 col-form-label">Year</label>
//                     <div className="col-sm-6">
//                         <input type="name" className="form-control" id="inputYear" placeholder="Year">
//                         </input>
//                     </div>
//                 </div>
//                 <Button onClick={this.onButtonClick} id="insertmemberbtn" value="Add">Add</Button>
//             </Form>
//             </div>
//
//         );
//     }
// });
class RosterForm extends Component{
    constructor(){
        super();

        // this.db = this.props.db;
    }

    onButtonClick(event){
        event.preventDefault();
        // this.firebaseRef.push({
        //    text:this.state.text
        // });
        // this.setState({text:""});
        console.log("add button clicked");
        let fname = document.getElementById("inputFname");
        let lname = document.getElementById("inputLname");
        fname = fname.value;
        lname= lname.value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;
        console.log("adding member", fname+ " " + lname+" "+quarter  + " "+ year);
        base.update('name',{
            data:{name: fname},
            then(err){
                if(!err){
                    alert("successfully added "+ fname)
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
    constructor(){
        super();
    }
    handleRemoveBtn(){
        let v = document.getElementById("selectRemove");
        v=v.options[v.selectedIndex].text;
        console.log("RosterEdit::handleRemoveBtn::triggered :" +v +"will be removed");
}
    componentDidMount(){
        // base.bindToState('names',{
        //     context:this,
        //     state:'tasks',
        //     asArray:true
        // });
    }
    componentWillMount() {
        //firebase -> fetch
        //allows you to retrieve the data from firebase endpoint
        // base.fetch('names', {
        //     context: this,
        //     asArray: true
        // }).then(data => {
        //     console.log(data)
        // }).catch(error=>{})
        //
    }
    generate(){
        let t=null;
        for (let v =0; v<members["name"].length;v++){
            console.log("RosterEdit::generate()::members['name']["+v+"]::"+members["name"][v]);
            t=<option>{members["name"][v]}</option>;
        }
        return t;
    }
    render(){
        return (
            <div className="splitform">
                <Form>
                    <div className="form-group">
                    <label >Remove Member</label>
                    <select className="form-control" id="selectRemove">
                        {/*{this.generate()}*/}
                    </select>
                        <Button onClick={this.handleRemoveBtn} id="removebtn" value="Remove"/>
                </div>

                </Form>
            </div>
        );

    }
}
export default RosterForm;
