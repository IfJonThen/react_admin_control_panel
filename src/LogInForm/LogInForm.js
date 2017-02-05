import React, { Component } from 'react';
import './LogInForm.css';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';

/* eslint-disable */

const LogInForm = React.createClass({
    getInitialState(){
        return{value:''};
    },
    handleChange(e){
        this.setState({value:e.target.value});
    },

    render(){
        return(
            <div className="logInForm">
            <Form id="myform">
                {/*<FormGroup>*/}
                  {/*<ControlLabel>Username</ControlLabel>*/}
                    {/*<FormControl type="text" value={this.state.value} placeholder="Username" onChange={this.handleChange}/>*/}
                {/*</FormGroup>*/}
                {/*<FormGroup>*/}
                    {/*<ControlLabel>Password</ControlLabel>*/}
                    {/*<FormControl type="password"value={this.state.value} placeholder="Password" onChange={this.handleChange}/>*/}
                {/*</FormGroup>*/}
                <FieldGroup id="formControlsText" type="text" label="Username" placeholder="Enter Username"/>
                <FieldGroup id="formControlsPassword" type="password" label="Password" placeholder="Enter Password"/>


            </Form>
            </div>
        );
    }
});
function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
export default LogInForm;
