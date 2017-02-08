import React, { Component } from 'react';
import logo from '../logo.svg';
import '../static/css/App.css';
import NavExample from './Nav';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import {browserHistory,Router} from 'react-router';
import {Grid} from 'react-bootstrap';
import MainView from './MainView';
import SplitView from './SplitView';
import DropdownSection, {Section} from './DropdownSection';
import {Button} from './ButtonGroup';
import RosterView from './RosterView';
import LogInControl from './LogInControl';

/*eslint no-unused-vars: "off"*/

class App extends Component {
    constructor(props){
        super(props);
        this.state={isLoggedIn:true};
        this.handleLogInChange=this.handleLogInChange.bind(this);
        this.goSomeWhere=this.goSomeWhere.bind(this);
        this.onChange=this.onChange.bind(this);
        console.log("App.js: state.isLoggedIn:"+this.state.isLoggedIn);
    }
    goSomeWhere() {
        this.setState({loc:"roster"});
        browserHistory.push('roster');
    }
    onChange(event){
        this.setState({roster:this.props.id});
    }
    handleLogInChange(e){
        console.log("App.js: handleLogInChange() before state:"+e);
        this.setState({isLoggedIn:e},()=>{
            setTimeout(()=>{

                console.log("App.js: handleLogInChange() after state:"+this.state.isLoggedIn)
            },500);
    });

    }
    render() {
        console.log("App.js render(): state.isLoggedIn:"+this.state.isLoggedIn);
        var navbar =null;
        var base = null;
        if(this.state.isLoggedIn) {
            navbar =(
                <div>
                    <NavExample/>
                <button onClick={this.goSomeWhere}>hello there</button>
                </div>
                    );
            if (this.state.loc=="roster"){
                var s = <Button id="AddM" value="Add Member"> why</Button>;
                var t=(<DropdownSection/>);
                {/*base=<SplitView left={s} right={t}/>;*/}
                base=<RosterView onChange={this.onChange}/>;
                //show roster
            }
            else if (this.state.loc=="home"){
                base= <MainView/>;
            }
        }
        else{
             navbar = <LogInControl onClick={this.handleLogInChange} isLoggedin={this.state.isLoggedIn} t={this.props.children}/>
        }

                return (<div className="App">
                        <div className="App-header">
                            <img src={logo} className="App-logo" alt="logo"/>
                            <h2>Welcome</h2>
                            </div>
                        {navbar}
                        {base}
                        {/*<Greeting isLoggedIn={this.state.isLoggedIn} t={this.props.children}/>*/}


            </div>
        );
    }
}
function Greeting(props){

    var isLoggedIn = props.isLoggedIn;
    let v = (<div><NavExample/><Grid fluid={true}>{props.t}</Grid></div>);

    if(isLoggedIn){
        return (v
        );
        // return (props.t);
    }
    else{
        return (<div>
            <h2>Please Log In.</h2>
            {/*<LogInForm/>*/}
            {/*<LogInControl onChange={props.handleLoginChange} isLoggedIn={isLoggedIn} t={l}/>*/}
        </div>);
    }
}

export default App;
// export class mainLayout{}
