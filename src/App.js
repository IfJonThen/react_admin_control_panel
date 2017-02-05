import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownSection from './DropdownSection/DropdownSection';
import NavExample from './Nav/Nav';
import {Col,Row,Well,Grid} from 'react-bootstrap';
import {Router,Route,Link} from 'react-router';

class App extends Component {
    render() {
        return (<div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>Welcome</h2>
                </div>
                <NavExample/>

                <Grid fluid={true}>
                    {this.props.children}
                </Grid>
            </div>
        );
    }
}
function SplitPane(props){
    return(<div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right">
            {props.right}
        </div>

    </div>);
}
// class mainLayout extends Component{
//     render(){
//             return(<DropdownSection/>
//             );
//     }
// }
export default App;
// export class mainLayout{}
