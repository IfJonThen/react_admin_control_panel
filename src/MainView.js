import React, { Component } from 'react';
import './static/css/MainView.css';
import DropdownSection from './components/DropdownSection';
import TableView from './components/TableView';
// var members={'Name':'Jon,Max,Gary'};
// var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];
class MainView extends Component{

    setTable(table){
        // this.props.table=table;
    }
    render() {
        if (table.length == null) {
            return (
                <SplitPane left={<DropdownSection/>} right={<div>
                    <p> there are no listings in the database yet</p>
                </div>}>

                </SplitPane>);
        }
        else {
            return (
                <SplitPane left={<DropdownSection/>} right={<TableView />}>

                </SplitPane>
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
