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
        this.handleSelectA=this.handleSelectA.bind(this);
        this.handleSelectR=this.handleSelectR.bind(this);
    }
    componentDidMount(){

    }
    componentWillUnMount(){

    }
    handleSelectR(event){
        console.log('RosterView::handleSelectRemove() clicked');
        console.log("remove "+event.target.id);
        this.setState({pane:"remove"});
    }
    handleSelectA(){
        console.log('RosterView::handleSelectAdd() clicked');
        this.setState({pane:"add"});
    }
    render() {
        let left =
            <div>
                <div className="row">
                    <Button onClick={this.handleSelectA}id="Add" value="Add Member"/>
                </div>
                <div className="row">
                    <Button onClick={this.handleSelectR}id="Remove" value="Remove Member"/>

                </div>
            </div>;
        let right =null;
        if (this.state.pane==="add"){
            right= <RosterForm db={this.props.db}/>;
        }
        else{
            right=<RosterEdit db={this.props.db}/>;
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
