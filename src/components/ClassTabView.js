import React, { Component } from 'react';
import '../static/css/MainView.css';
import {Button} from './ButtonGroup';
import ClassesForm,{ClassView} from './ClassesForm';
import {classDB, getUID} from '../static/js/functions';

import {base} from "../static/js/firebaseRef";
/*eslint no-unused-vars: "off"*/

class ClassTabView extends Component{

    /*ClassTabView()::constructor()
    * bind the functions..thanks es6 -_-
    * set states to default (empty or 0)
    * calls pullDB() to fill states. will most likely change to re-base.syncState in the future
    *  */
    constructor(){
      super();
      this.count=0;
      this.state={pane:"update",count:0,base:[]};

        this.handleSelectA=this.handleSelectA.bind(this);
        this.handleSelectR=this.handleSelectR.bind(this);
        this.handleSelectC=this.handleSelectC.bind(this);
        this.onChange=this.onChange.bind(this)
        // this.pullList=this.pullList.bind(this);
        this.pullList2=this.pullList2.bind(this);
        this.fillSelect=this.fillSelect.bind(this);
        this.pullDB=this.pullDB.bind(this);
        this.loadSections=this.loadSections.bind(this);
        this.pullClassList=this.pullClassList.bind(this);
        this.pullDB();
    }
    componentDidMount(){
        // console.log("ClassTabView::componentDidMount()::");
        // var firebaseRef = firebase.database().ref("Names");
        base.syncState("users",{
            context:this,
            state:'base',
            asArray:true
        });

    }
    componentWillReceiveProps(){
        // console.log("ClassTabView::ComponentWillReceiveProps  ");
    }
    componentWillUnMount(){

    }
    /*ClassTabView()::pullDB()
    * pulls data from database via re-base.fetch()
    * sets "base" state and "count" state
    * may change to syncState
    *  */
    pullDB(){
        base.fetch('users', {
            context: this, asArray: true,
        }).then(data=>
        {
            this.count=data.length;
            // console.log("ClassTabView::pullDB():: data contains " + ((data)=>{if (data !== null){return "data";}}));
            this.setState({base:data,count:this.count});
        }).catch(error=>{
            console.log("ClassTabView:constructor: fetch error");
        });
        console.log("ClassTabView::constructor::this.state.count " + this.state.count);
    }
    /*ClassTabView()::pullClassList()
    * pulls class List from data base via fetch
    * for the typeahead
    * */
    pullClassList(){
        base.fetch('classDB',{
            context:this,asArray:true,
        }).then(data=>{

        }).catch(error=>{
            console.log("ClassTabView::pullClassList():: fetch error");
        });
        return [];
    }
    /*ClassTabView()::loadSections()
    * helper function
    * makes a call to pullList, may remove in the future
     */
    loadSections(){
        this.pullList();
    }
    /*ClassTabView()::onChange()
     * helper function for Rosterform to generate children for props
     * makes a call to pullDB, may remove in the future
     */
    onChange(){
        if (this.state.count===undefined){
            this.pullDB();
            return this.state.count;
        }
        else{
            return this.state.count;
        }
    }

    /*ClassTabView()::handleSelectR()
     * handler function for the Remove Button
     * changes state to "remove"
     * */
    handleSelectR(event){
        // console.log('ClassTabView::handleSelectRemove() clicked');
        this.setState({pane:"byMem"});
        // this.pullList();
    }

    /*ClassTabView()::handleSelectA()
     * handler function for the AddButton
     * changes state to "add"
     * */
    handleSelectA(){
        this.setState({pane:"update"});
    }
    handleSelectC(e){
        console.log (e);
        this.setState({pane:"byClass"});
    }

    /*
    * RosterEdit()::pullList2
    * generates children for RosterEdit select form based on the number of children in state.base
    *
    * */
    pullList2(){
        let v = [];
        var t =document.getElementById("selectRemove");
        // console.log("ClassTabView::pullList2:: this.state.base:" +this.state.base);
        for(let j =0; j<this.state.count;j++){
            if((this.state.base[j]['first']&& this.state.base[j]['last'])!==(null||undefined)) {
                if (typeof this.state.base[j] !== 'string') {
                    let name = this.state.base[j]['first']+ " "+ this.state.base[j]['last'];
                    let pledgequarter = ' - '+ this.state.base[j]['quarter']+" "+this.state.base[j]['year'];
                    v.push(<option id={getUID(this.state.base[j])}key={j}>{name+pledgequarter}</option>);
                }
                else{
                    console.log("ClassTabView::pullList()...no children added");
                }
            }
        }
        // console.log("RosterForm: pullList2: added "+v+" options");
        return v;
    }
    /*
     * ClassTabView()::fillSelect
     * generates children for ClassTabView select form based on the number of children in state.base
     *
     * */
    fillSelect(id,arr){
        let v = [];
        var t =document.getElementById(id);
        for(let j =0; j<this.state.count;j++){
            if(arr[j]!==(null||undefined)) {
                if (typeof this.state.base[j] !== 'string') {
                    v.push(<option key={j}>{arr[j]}</option>);
                }
                else{
                    console.log("ClassTabView::fillSelect()...no children added");
                }
            }
        }
        return v;
    }

    /*ClassTabView()::Render()
     * controlled by App.js conditionally renders left and right panes
      * if state is add, renders RosterForm
      * if state is remove, renders ClassTabView
     */
    render() {
        let left =
            <div className="RosterPane">
                <div className="row">
                    <Button cname="rosterbtn paneBtn" onClick={this.handleSelectA}id="UpdateBtn" value="Update Classes"/>
                </div>
                <div className="row">
                    <Button cname="rosterbtn paneBtn" onClick={this.handleSelectA}id="AddCBtn" value="Add Classes"/>
                </div>
                <div className="row">
                    <Button cname="rosterbtn paneBtn" onClick={this.handleSelectR}id="GetByMemBtn" value="Get Schedules by Member"/>
                </div>
                <div className="row">
                    <Button cname="rosterbtn paneBtn" onClick={this.handleSelectC}id="GetByClassBtn" value="Get Schedules by Class"/>
                </div>
            </div>;
        let right=null;
        let v= this.pullList2();
        let classList=this.pullClassList();
        if (this.state.pane==="update"){
            let count= this.onChange();
            right= <ClassesForm right={v} system="Quarter" options={classDB}count={count}/>;
        }
        else if (this.state.pane==="byMem"){
            right=<ClassView right={v} selectID="selectRemove"formLabel="Select Member"count={this.state.count}/>;
        }
        else if (this.state.pane==="byClass"){
            v=this.fillSelect("selectByClass",classDB);
            right= <ClassView selectID="selectByClass"formLabel="Select Class"right={v} count={this.state.count}/>;
        }

        return (
            <div>
                <SplitPane pane={this.state.pane} left={left} right={right}>
                    </SplitPane>
                    </div>
            );

    }
}
ClassTabView.propTypes={
    count:React.PropTypes.number
};
ClassTabView.defaultProps={
    count:0
};
function SplitPane(props){
    return(<div className="SplitPane">
        <div className="SplitPane-left">
            {props.left}
        </div>
        <div className="SplitPane-right modal-container">
            {props.right}
        </div>

    </div>);
}

export default ClassTabView;
