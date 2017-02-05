import React, { Component } from 'react';
import './TableView.css';
import {Table} from 'react-bootstrap';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
const TableView = React.createClass({
    handleSelect(eventKey){
        event.preventDefault();
        console.log('selected ${eventKey');
    },
    render(){

            return (
                <Table responsive id="table">

                </Table>

            )
    }
});


export default TableView;
