import React, { } from 'react';
import '../static/css/LogInControl.css';
import {parseForm}from '../static/js/functions';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';

/*eslint no-unused-vars: "off"*/

class LogInControl extends React.Component{

    constructor(props){
        super(props);
        this.logInCheck = this.logInCheck.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);

        // this.handleChange = this.props.handleChange.bind(this);
        this.state={isLoggedIn:false,t:props.t,uname:"1",pw:"2"};
        console.log("LogInControl(): state.isLoggedIn:"+this.state.isLoggedIn);
        console.log("LogInControl(): this.isLoggedIn:"+this.ili);
    }

    /* LogInControl(): log in check
    * calls props and reports if log in information is correct;
    * */
    logInCheck(e){
        event.preventDefault();
        // alert("logged in");
        //query to node to authenticate log in information
        //temporarily is true
        // let v = document.getElementById("formControlsText").value;
        // let y = document.getElementById("formControlsPassword").value;
        // let login =[v,y];
        let login = parseForm ([],[["id","formControlsText"],["id", "formControlsPassword"]]);
        // let logInInfo= {uname:login[0],password:login[1]};
        console.log("LogInControl()::loginCheck:: username and password are "+ login);
        this.props.handleLogIn(true);
    }


    handleLogOutClick(){
        alert("logged out");
        this.setState({isLoggedIn:false});
    }
    render(){
        // const Ls=this.state.isLoggedIn;
        // console.log("LogInControl() render(): Ls "+Ls);
        // let button=null;
        // if (Ls){
        //     return this.props.t;
        //     // return(<button onClick={props.onClick}>
        //     //     Logout
        //     // </button>);
        //     // return (this.props.t);
        // }
        // else{
            return(
                <div className="logInForm">
                    <h2>Please Log In.</h2>
                    <Form id="myform">
                        <FieldGroup id="formControlsText" onChange={this.handleUName}type="text" label="Username" placeholder="Enter Username"/>
                        <FieldGroup id="formControlsPassword" onChange={this.handlePW}type="password" label="Password" placeholder="Enter Password"/>
                        <button  onClick={this.logInCheck}> Log In</button>
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
