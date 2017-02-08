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

class MainView extends Component{

    setTable(table){
        // this.props.table=table;
    }
    render() {
        let v = (<div><NavExample/><Grid fluid={true}></Grid></div>);

        if (table.length == null) {
            return (<div>
                <DropdownSection/>
                {v}
                </div>
           );
        }
        else {
            return (<div>

                <DropdownSection/>{v}
                </div>
            );
        }
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

export default MainView;
