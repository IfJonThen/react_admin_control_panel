import React, {Component } from 'react';
import '../static/css/RosterView.css';
import AttendeeSquare from './AttendeeSquare';
import {Button} from './ButtonGroup';
import {toDayte,getQuarter,getUID,getSelectText,sortMembers} from '../static/js/functions';
import {login,firebaseAuth} from '../static/js/firebaseAuth';
import update from 'immutability-helper';
import {base} from '../static/js/firebaseRef';
/*eslint no-unused-vars: "off"*/

class AttendanceForm extends Component{
    /*AttendanceForm::constructor()
    * binds the functions thanks es6 -_-
    * sets base state "count" equal to props.count
    * */
    constructor(props){
        super(props);
        // this.count=props.count;
        this.click=this.click.bind(this);
        // console.log(props.currentWeek, (props.currentWeek.length||1));
        this.state={undergrad:[],tally:{},weekSelect:(props.currentWeek.length-1||1),
            tallyMap:props.currentWeek,
            currentMap:(props.currentWeek[(props.currentWeek.length-1)]),
            newMap:false,newForm:{}};
        this.onButtonClick= this.onButtonClick.bind(this);
        this.onSave=this.onSave.bind(this);
        this.onChange=this.onChange.bind(this);
        this.setExcused=this.setExcused.bind(this);
        this.fetchTotal=this.fetchTotal.bind(this);
        this.members=[];
        this.tally=  new Tally();
        if (this.state.currentMap===(null||undefined)){
            this.state.currentMap={};
            for (let i =0;i<this.props.members.length;i++){
                this.state.currentMap[this.props.memId[i]]=-1;
            }
        }
        for (let i =0;i<this.props.members.length;i++){
            this.members.push([this.props.members[i],this.props.memId[i]]);
            this.tally.updateTree("individual",this.props.memId[i],-1);
            this.tally.updateTree("new",this.props.memId[i],-1);
            this.state.newForm[this.props.memId[i]]=-1;

        }
        if (props.tallyTree!==(undefined || null)){
            this.tally.copyT(props.tallyTree);
        }
        // console.log(JSON.stringify(this.tally.getT()));
        let l = {email:"pikahatonjon@gmail.com",password:"password"};
        login(l);
    }

    /* AttendanceForm()::onButtonClick()
    * bind by constructor, parses Add form for data and sends it to AddToDB helper function
    * */
    fetchTotal(id){
        this.tally.setTree("total",id);
        if (this.state.newMap) {
            for (let weekCount = 0; weekCount <= this.state.weekSelect-1; weekCount++) {
                console.log(id + "'s count for week " + weekCount + ":" + this.state.tallyMap[weekCount][id]);
                if (this.state.tallyMap[weekCount][id] === 1) {
                    this.tally.incTotal(id);
                }
            }
            if (this.state.newForm[id]===1){
                this.tally.incTotal(id);
            }
        }
        else{
            for (let weekCount = 0; weekCount <= this.state.weekSelect; weekCount++) {
                console.log(id + "'s count for week " + weekCount + ":" + this.state.tallyMap[weekCount][id]);
                if (this.state.tallyMap[weekCount][id] == 1) {
                    this.tally.incTotal(id);
                }
            }
        }
    }
    click(id,newTally){
        if (this.tally!==null) {
            let tree="individual";
            let newT = {};
            newT[id] = newTally;
            if (!this.state.newMap) {
                this.setState({
                    currentMap: update((this.state.currentMap), {$merge: newT})
                });
            }
            else{
                tree="new";
                this.setState({
                    newForm: update((this.state.newForm), {$merge: newT})
                });
            }
            this.tally.updateTree(tree,id,newTally);
        }
        else{
            console.log('tally update ERROR');
        }
    }
    onChange(event){
        let t = document.getElementById(event.target.id);
        if (t!=null && t.selectedIndex!==(null||undefined)){
            let selectedText = t.options[t.selectedIndex].text;
            selectedText=selectedText.split(" ");
            selectedText=parseInt(selectedText[1],10)-1;
            console.log("changing week to index :"+ selectedText);
            let temp=false;
            if (selectedText>=this.props.currentWeek.length){
                temp=true;
                this.setState({newMap:temp,weekSelect: selectedText, currentMap: this.tally.getT("new")});

            }
            else {
                this.setState({newMap:temp,weekSelect: selectedText, currentMap: this.state.tallyMap[selectedText]});
               this.tally.copyT(this.state.currentMap);
            }
        }
    }
    setExcused(){

    }
    onSave(){
        //add individual tallies for the quarter
        for (let i =0; i<this.props.memId.length;i++) {
            let current = this.props.memId[i];
            console.log(current + " " + this.tally.getTree("individual",current));
            if ((current &&this.tally.getTree("individual",current))!==(null||undefined)){
                let tempdata={};
                if (!this.state.newMap){
                    tempdata[this.state.weekSelect]=this.tally.getTree("individual",current);
                }
                else{
                    tempdata[this.state.weekSelect]=this.tally.getTree("new",current);
                }
                base.update(`UID/` + current + "/Attendance/Quarter/" + getQuarter(), {
                    context: this,
                    data: tempdata,
                    then(err){
                        if (!err) {
                            console.log("NO ERROR!!");
                        }
                        else {
                            console.log(err);
                        }
                    }
                });
            }
        }
        let l ={};
        let t = this.props.currentWeek.length;
        // console.log("props\n"+ JSON.stringify(this.tally.getT("individual")));
        // console.log(this.state.weekSelect);
        // l[this.state.weekSelect]=this.tally.getT();
        if (!this.state.newMap){
            l[this.state.weekSelect]=this.state.currentMap;
            this.setState({
                tallyMap:update(this.state.tallyMap,{$merge:l})});
        }
        else{
            l[this.state.weekSelect]=this.state.newForm;
        }
            base.update("Attendance/Quarter/"+getQuarter()+"/", {
            context:this,
            data:l,
            then(err){
                if (!err) {
                    console.log("NO ERROR!!");
                }
                else{
                    console.log("Error "+ err);
                }
            }
        });
        // this.props.redraw();
    }

    onButtonClick(event){
        event.preventDefault();
        let fname = document.getElementById("inputFname").value;
        let lname = document.getElementById("inputLname").value;
        let quarter = document.getElementById("selectPledgeYear");
        quarter = quarter.options[quarter.selectedIndex].text;
        let year = document.getElementById("inputYear").value;
        // this.addToDB(fname,lname,quarter,year);
    }
    render(){
        //check if week exists
        let k = toDayte();
        let t = [this.props.members,this.props.memId];
        let temp =[1];
        console.log("outputting currentWeek/n"+this.props.currentWeek);
        console.log(this.props.currentWeek.length);
        console.log(this.state.weekSelect);
        for (let ind=1; ind<this.props.currentWeek.length+1;ind++){
            temp.push(ind+1);
        }
        for (let mem=0;mem<this.members.length;mem++){
            console.log(this.members[mem]);
            this.fetchTotal(this.members[mem][1]);
        }
        console.log(this.tally.getT("total"));
        this.members=sortMembers(this.members,this.tally.getT("total"));

        // console.log("Render()::::"+this.state.weekSelect);
        return(
            <div className="attendView">
                <div className="row">
                <h1 style={{color:"black"}}>Attendance <span style={{color:"red"}}>{k}</span></h1>
                </div>
            <div className="row">
                <select defaultValue={"Week "+(this.state.weekSelect+1)} onChange={this.onChange}id="weekselect">
                    {temp.map((val)=>{
                        return (<option key={val}>Week {val}</option>)
                    })
                    }
                </select>
                <Button onClick={this.onSave}cname="saveButton"value="save"/>
                {/*<Button onClick={this.setExcused}cname="saveButton"value="Set Excused"></Button>*/}
                </div>
                <div className="attendForm">

                {this.members.map((member)=> {
                    let tally = -1;
                    if (this.state.currentMap !== (null || undefined)&& !this.state.newMap) {
                        tally = this.state.currentMap[member[1]];
                    }
                    else if (this.state.newMap){
                        tally=this.state.newForm[member[1]];
                    }
                    let total=this.tally.getTree("total",member[1]);
                   return <AttendeeSquare
                                    tally={tally} total={total}
                                    key={member[1] + member[0]} val={member[1]} clickButton={this.click}
                                    name={member[0]}/>
                })
                }
                </div>
            </div>

        );
    }
}

export default AttendanceForm;
class Tally {
    constructor(){
        this.updateTree=this.updateTree.bind(this);
        this.getTree=this.getTree.bind(this);
        this.getT=this.getT.bind(this);
        this.setTree=this.setTree.bind(this);
        this.tree={"individual":{},"new":{},"total":{}};
        this.copyT=this.copyT.bind(this);
        this.incTotal=this.incTotal.bind(this);
    }
    incTotal(id){
        if (this.tree["total"][id]!==(null ||undefined)){
            this.tree["total"][id]+=1;
        }
        else{
            this.tree["total"][id]=1;
        }
    }
    copyT(t){
        this.tree['individual']=t;
    }
    setTree(key,id){
        this.tree[key][id]=0;
    }
    updateTree(key,id,tally){
        this.tree[key][id]=tally;
    }
    getT(key){
        return this.tree[key];
    }
    getTree(key,id){
        return this.tree[key][id];
    }
}
