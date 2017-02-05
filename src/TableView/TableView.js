import React, { Component } from 'react';
import './TableView.css';
import {Table} from 'react-bootstrap';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
class TableView extends Component{
    constructor() {
        super();
        // this.props.table={'Gary':['ICS 32', 'CS 161','CS 132'],'Jon':['CS 161', 'CS 132', 'Informatics 43', 'Informatics 132'],'Max':['ICS 45C', 'Informatics 43','Econ 2B']};
        this.keys=['Gary','Jon','Max'];
        // buildTable();
        // this.table=;
    }

    render(){

            return (
                <div>
                    <Table responsive id="table"></Table>
                </div>

            )
    }
}


export default TableView;
