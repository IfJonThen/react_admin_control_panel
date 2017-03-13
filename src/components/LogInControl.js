import React, { } from 'react';
import '../static/css/LogInControl.css';
import {parseForm}from '../static/js/functions';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';
import base from '../static/js/firebaseRef';
import {Button} from './ButtonGroup';
/*eslint no-unused-vars: "off"*/

class LogInControl extends React.Component{

    constructor(props){
        super(props);
        this.logInCheck = this.logInCheck.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        // this.handleChange = this.props.handleChange.bind(this);
        this.state={isLoggedIn:false,uname:"1",pw:"2"};
    }

    /* LogInControl(): log in check
    * calls props and reports if log in information is correct;
    * */
    logInCheck(){
        event.preventDefault();
        let login = [];
        login=parseForm (login,[["id","formControlsText"],["id", "formControlsPassword"]]);
        // let logInInfo= {uname:login[0],password:login[1]};
        console.log("LogInControl()::loginCheck:: username and password are "+ login);
        this.props.isLoggedin(login);
    }


    handleLogOutClick(){
        alert("logged out");
        this.setState({isLoggedIn:false});
    }
    render(){
        // alert(this.state.uname);
            return(
                <div className="logInForm">
                    <h2>Please Log In</h2>
                    <Form id="myform">
                        <FieldGroup id="formControlsText" type="text" label="Username" placeholder="Enter Username"/>
                        <FieldGroup id="formControlsPassword" type="password" label="Password" placeholder="Enter Password"/>
                        <button className="button loginButton" id="loginBtn"onClick={this.logInCheck} >Log In</button>
                    </Form>
                </div>
            );
        }
    // }
}
function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}
export default LogInControl;
