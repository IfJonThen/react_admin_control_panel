import React, { Component } from 'react';
import '../static/css/MainView.css';
import NavExample from "./Nav";
import {Grid} from 'react-bootstrap';
import DropdownSection from './DropdownSection';
import TableView from './TableView';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];
/*eslint no-unused-vars: "off"*/

class SplitView extends Component{
    constructor(props){
      super();
      // this.state={this.props.field};
        this.handleSelect= this.handleSelect.bind(this);
    }
    handleSelect(){

    }
    render() {
        let v = <div><NavExample/><Grid fluid={true}></Grid></div>;

            return (
                <div>
                <SplitPane left={this.props.left} right={this.props.right}>
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

export default SplitView;
