import React, { } from 'react';
import './LogInControl.css';
import {Link} from 'react-router';
import {Form,FormControl,ControlLabel,HelpBlock,FormGroup} from 'react-bootstrap';

/*eslint no-unused-vars: "off"*/

class LogInControl extends React.Component{
    constructor(props){
        super(props);
        this.handleLogInClick = this.handleLogInClick.bind(this);
        this.handleLogOutClick = this.handleLogOutClick.bind(this);
        this.handleUName = this.handleUName.bind(this);
        this.handlePW = this.handlePW.bind(this);
        this.ili = props.isLoggedIn;
        // this.handleChange = this.props.handleChange.bind(this);
        this.state={isLoggedIn:false,t:props.t,uname:"1",pw:"2"};
        console.log("LogInControl(): state.isLoggedIn:"+this.state.isLoggedIn);
        console.log("LogInControl(): this.isLoggedIn:"+this.ili);
    }
    handleLogInClick(e){
        event.preventDefault();
        // alert("logged in");
        this.props.onClick(true);
        // this.ili=true;
        this.setState({isLoggedIn:!this.state.isLoggedIn},console.log("LogInControl: state.isLoggedIn "+this.state.isLoggedIn));
        this.context.router.transitionTo('home');

        // console.log("++++" + e.);
    }
    handleUName(e){
        this.setState({uname:event.target.value});
        console.log("uname is "+event.target.value);
    }
    handlePW(e){
        this.setState({pw:event.target.value});
        console.log("pw is "+event.target.value);
    }

    handleLogOutClick(){
        alert("logged out");
        this.setState({isLoggedIn:false});
    }
    render(){
        const Ls=this.state.isLoggedIn;
        console.log("LogInControl() render(): Ls "+Ls);
        let button=null;
        if (Ls){
            return null;
            // return(<button onClick={props.onClick}>
            //     Logout
            // </button>);
            // return (this.props.t);
        }
        else{
            return(
                <div className="logInForm">
                    <h2>Please Log In.</h2>
                    <Form id="myform">
                        <FieldGroup id="formControlsText" onChange={this.handleUName}type="text" label="Username" placeholder="Enter Username"/>
                        <FieldGroup id="formControlsPassword" onChange={this.handlePW}type="password" label="Password" placeholder="Enter Password"/>
                        <button onClick={this.handleLogInClick}> Log In</button>
                    </Form>
                </div>
            );
        }
    }
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
