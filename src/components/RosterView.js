import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Form, Grid} from 'react-bootstrap';
import SplitView from './SplitView';
import TableView from './TableView';
import {Button} from './ButtonGroup';
import RosterForm,{RosterEdit} from './RosterForm';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];
import * as firebase from "firebase";
/*eslint no-unused-vars: "off"*/


class RosterView extends Component{
    constructor(props){
      super(props);
      this.state={pane:"add"};

    }

    handleSelectR(event){
        console.log("remove"+this.props.id);
        this.setState({pane:"remove"});
    }
    handleSelectA(){
        this.setState({pane:"add"});
    }
    render() {
        let left =
            <div>
                <div className="row">
                    <Button onClick={this.handleSelectR}id="Add" value="Add Member"/>
                </div>
                <div className="row">
                    <Button onClick={this.handleSelectA}id="Remove" value="Remove Member"/>

                </div>
            </div>;
        let right =null;
        if (this.state.pane==="add"){
            right= <RosterForm/>;
        }
        else{
            right=<RosterEdit/>;
        }

        return (
            <div>
                <SplitPane pane={this.state.pane} left={left} right={right}>
                    </SplitPane>
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

export default RosterView;
