import React, {Component } from 'react';
import '../static/css/LogInForm.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';


/*eslint no-unused-vars: "off"*/

class RosterForm extends React.Component{

    render(){
        return(<Form id="rosterform">
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
                    <label className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-6">
                        <input type="name" className="form-control" id="inputLname" placeholder="Last Name">
                        </input>
                    </div>
                </div>
                <div className="form-group row">
                    <label  className="col-sm-2 col-form-label">Pledge Class</label>
                    <div className="col-sm-6">
                        <select className="form-control" id="exampleSelect1">
                            <option>Fall</option>
                            <option>Winter</option>
                            <option>Spring</option>
                        </select>
                    </div>
                </div>
            </Form>

        );
    }
}
export class RosterEdit{
    render(){
        return (
            <div>
                <Form>
                    <div class="form-group">
                    <label for="exampleSelect1">Example select</label>
                    <select class="form-control" id="exampleSelect1">
                        {(members)=>{
                            for(let i =0;i<3;i++){
                            (members,v)=>{
                                return <option>{members["name"][v]}</option>;
                                }
                            };
                        }}
                    </select>
                </div>

                </Form>
            </div>
        );

    }
}

export default RosterForm;
