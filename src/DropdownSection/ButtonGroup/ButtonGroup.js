import React, { Component } from 'react';
import './ButtonGroup.css';

var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var classKey={'Writing 30': ['Writing','30'],
                'Informatics 43':['Informatics', '43'],
                'ICS 45C':['ICS', '45C'],
                'ICS 5': ['ICS','5'],
                'Film 85A':['Film','85A'],
                'Econ 20B':['Econ','20B'],
                'ICS 31':['ICS','31'],
                'Math 2A':['Math', '2A'],
                'ICS 45J':['ICS', '45J']
}
var mf16={
        'quarter':'fall',
        'year':'2016',
            'classes': ['Writing 30','Informatics 43','ICS 45C']
};
var gf16={
    'quarter':'fall',
    'year':'2016',
    'classes': ['CS 161','Informatics 122','ICS 45C','Math 2A']
};
var jf16={
    'quarter':'fall',
    'year':'2016',
    'classes': ['CS 161','Informatics 43','Econ 20B']
};
var temps={"mf16":mf16,"gf16":gf16,"jf16":jf16};
var maxwinter2016={}
var garyfall2014={}
var jonfall2013={}
var table=[];
class Button extends React.Component {
    addValue(){
        console.log("adding value");
    }
    render() {
        return (<button className="btn" onClick={this.addValue.bind(this)}>
                {this.props.value}
            </button>
        );
    }
}
class ButtonGroup extends Component {
    renderButtons(i,j){
        return (<Button id={j} value={i}/>);
    }
    render() {
        return (<div>
                {this.renderButtons("Jon_Fall 2016",'jf16')}
                {this.renderButtons("Max_Fall 2016",'mf16')}
                {this.renderButtons("Gary_Fall 2016",'gf16')}
        </div>
        );
    }
}
function addMember(info){
    alert(info);
    // document.getElementById("table").appendChild('<td>temps[info]["quarter"]</td>');
}
function check(){

}
export default ButtonGroup;
