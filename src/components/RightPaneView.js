import {React, Component} from "react";
import '../static/css/MainView.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import {Button} from './ButtonGroup';
import Rebase from 're-base';
/*eslint no-unused-vars: "off"*/
import {base} from '../static/js/firebaseRef';

/**
 * Created by Jonsen on 10/25/2017.
 */
export class RightPaneView extends Component{
    constructor(props){
      super(props);
        this.state={base:[],current: {}};
        this.handleEditBtn = this.handleEditBtn.bind(this);
      this.onButtonClick = this.onButtonClick.bind(this);
      this.addToDB= this.addToDB.bind(this);
    };
    handleEditBtn(event){
        event.preventDefault();
        // let t = document.getElementById("selectRemove");
        // console.log("RosterEdit::handleRemove::"+t.options[t]);
        let v = document.getElementById("selectEdit");
        v=v.options[v.selectedIndex].text;
        console.log(this.state.base);
        console.log("RightPane:RosterEdit::handleEditBtn::triggered :" +v +" will be edited");
    }
    componentDidMount() {
        // console.log("RosterForm::componentDidMount()::");
        // var firebaseRef = firebase.database().ref("Names");
        // base.syncState("users",{
        //     context:this,
        //     state:'base',
        //     asArray:true
        // });
    }
    onButtonClick(event){
        event.preventDefault();
        let fname = document.getElementById("inputFname").value;
        let lname = document.getElementById("inputLname").value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;
        let email = document.getElementById("inputEmail").value;
        let grad = document.getElementById("selectGrad");
        grad=grad.options[grad.selectedIndex].text;
        if (grad==="Yes"){
            grad=true;
        }
        else{
            grad=false;
        }
        this.addToDB({fname,lname,quarter,year,grad,email});

    }
    addToDB(params){
        // console.log("RosterForm add "+ this.count);
        let t = {};
        if (this.state.base!==undefined) {
            t= {first:params.fname,last:params.lname,quarter:params.quarter,year:params.year,graduated:params.grad,email:params.email};
            this.setState({base:this.state.base.concat([t])});
        }
    }
    render(){
        let  t = this.state.current;
        return(<div>
            <div className="splitform">
                <Form className="entryForm" id="rosterform">
                <div className="form-group">
                    <label id="editFormLabel">Remove Member</label>
                    <select className="form-control" id="selectEdit">
                        {this.props.right}
                    </select>
                    <Button cname="actionBtn"onClick={this.handleEditBtn} id="editbtn" value="Select"/>

                </div>

                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">First Name</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputFname" placeholder={t||"First Name"}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Last Name</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputLname" placeholder={t.lname||"Last Name"}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-4 col-form-label">Pledge Class</label>
                    <div className="col-sm-8">
                        <select defaultValue = {t.pledegeyear || "Fall"}className="form-control" id="selectPledgeYear">
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Year</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputYear" placeholder={t.year||"Year"}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Email</label>
                    <div className="col-sm-8">
                        <input type="name" className="form-control" id="inputEmail" placeholder={t.email || "Email"}>
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-4 col-form-label">Graduated</label>
                    <div className="col-sm-8">
                        <select defaultValue={t.grad ||"No"} className="form-control" id="selectGrad">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                    </div>
                </div>

                <Button cname="actionBtn" onClick={this.onButtonClick} id="savememberbtn" value="Save">Add</Button>
            </Form>
            </div>
            </div>
        );
    };

}
export default RightPaneView;