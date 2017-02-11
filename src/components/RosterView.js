import React, { Component } from 'react';
import NavExample from "./Nav";
import {Form, Grid} from 'react-bootstrap';
import '../static/css/MainView.css';

import SplitView from './SplitView';
import TableView from './TableView';
import {Button} from './ButtonGroup';
import RosterForm,{RosterEdit} from './RosterForm';
var members={'Name':'Jon,Max,Gary'};
var memInfo= {'Gary':{},'Jon':{},'Max':{} };
var table=[];

import {base} from "../static/js/firebaseRef";
/*eslint no-unused-vars: "off"*/


class RosterView extends Component{

    constructor(){
      super();
      this.count=0;
      this.state={count:null,base:null};

      this.state={pane:"add"};
        this.handleSelectA=this.handleSelectA.bind(this);
        this.handleSelectR=this.handleSelectR.bind(this);
        this.onChange=this.onChange.bind(this)
        this.pullList=this.pullList.bind(this);
        this.pullList2=this.pullList2.bind(this);
        this.pullDB=this.pullDB.bind(this);
        this.loadSections=this.loadSections.bind(this);
    }
    componentDidMount(){

    }
    componentWillUnMount(){

    }
    pullDB(){
        base.fetch('users', {
            context: this, asArray: true,
        }).then(data=>
        {
            this.count=data.length;
            console.log("data contains " +data);
            this.setState({base:data,count:data.length});
        }).catch(error=>{
            console.log("RosterView:constructor: fetch error");
        });
        console.log("RosterView::constructor::this.state.value " + this.state.count);
    }
    loadSections(){
        this.pullList();
    }
    onChange(){
        if (this.state.count===undefined){
            this.pullDB();
            return this.state.count;
        }
        else{
            return this.state.count;
        }
        // this.pullList();
    }
    handleSelectR(event){
        // console.log('RosterView::handleSelectRemove() clicked');
        this.setState({pane:"remove"});
        this.pullList();
    }
    handleSelectA(){
        // console.log('RosterView::handleSelectAdd() clicked');
        this.setState({pane:"add"});
    }
    pullList(){
        let v = null;
        var t =document.getElementById("selectRemove");
        console.log("RosterView::pullList:: this.state.base:" +this.state.base);
        if (t !=null) {
            for (let j = 0; j < this.state.count; j++) {
                if (typeof this.state.base[j] === 'string') {
                    v = document.createElement("option");
                    v.appendChild(document.createTextNode(this.state.base[j]));
                    v.value = j + 1;
                    t.appendChild(v);
                }
            }
        }
        console.log("RosterForm: pullList: added "+this.state.count +" options");
    }
    pullList2(){

        let v = [];
        var t =document.getElementById("selectRemove");
        console.log("RosterView::pullList2:: this.state.base:" +this.state.base);
        for(let j =0; j<this.state.count;j++){
            if(typeof this.state.base[j]=== 'string') {
               v.push(<option key={j}>{this.state.base[j]}</option>);
            }
        }
        console.log("RosterForm: pullList2: added "+v+" options");

        return v;
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
        let v = this.pullList2();

        if (this.state.pane==="add"){
            let count= this.onChange();
            right= <RosterForm onChange={count}/>;
        }
        else{
            right=<RosterEdit right={v} count={this.state.count}/>;
        }

        return (
            <div>
                <SplitPane pane={this.state.pane} left={left} right={right}>
                    </SplitPane>
                    </div>
            );

    }
}
RosterView.propTypes={
    count:React.PropTypes.number
};
RosterView.defaultProps={
    count:0
};
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
